import React, { Component } from 'react';
import Cookies from 'cookies-js';

import List from './List';
import BackRef from './BackRef';

const url = 'https://cloud-api.yandex.net:443/v1/disk/resources';
const LIMIT = 20;
function encode(obj) {
  return Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
}


class Content extends Component {
  constructor(props) {
    super(props);
    this.token = JSON.parse(Cookies.get('authHeaders'))['access-token'];
    this.state = {};
  }

  componentDidMount() {
    this.extractItems('/', 0, LIMIT);
  }

  onBackRefPressed = (e) => {
    e.preventDefault();
    const history = this.state.history.slice(0);
    const previousId = history.pop();
    this.setState({
      currentId: previousId,
      history,
    });
  }

  onListItemPressed = (recordId, history) => {
    this.setState({ currentId: recordId, history });
  }

  extractItems = async (path, offset, limit) => {
    const params = { limit, offset, path };
    const response = await window.fetch(`${url}?${encode(params)}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `OAuth ${this.token}`,
      },
    });
    if (!response.ok) {
      return;
    }
    const json = await response.json();
    const embedded = json['_embedded'];
    const resourceId = json.resource_id;
    if ((embedded.total !== embedded.items.length) && (embedded.total > offset)) {
      this.extractItems(path, offset + limit, limit);
    }
    if (!Object.keys(this.state).length) {
      this.setState({
        root: {
          id: resourceId,
          path: this.state.root,
        },
        currentId: resourceId,
        history: [],
      });
    }
    Object.values(embedded.items).forEach((item) => {
      if (item.type === 'dir') {
        this.extractItems(item.path, 0, LIMIT);
      }
      const addedObject = {
        id: item.resource_id,
        path: item.path,
        size: (item.type === 'dir') ? null : item.size,
      };
      const resourceArray = (resourceId in this.state) ?
        this.state[resourceId].concat(addedObject) :
        [addedObject];
      this.setState({ [resourceId]: resourceArray });
    });
  }

  render() {
    let result = <div>Loading...</div>;

    if (Object.keys(this.state).length) {
      const { currentId, history, root } = this.state;
      const items = this.state[currentId];
      const backRef = (currentId !== root.id) ? <BackRef onClick={this.onBackRefPressed} /> : null;
      result = (
        <div>
          { backRef }
          <List
            currentId={currentId}
            items={items}
            history={history}
            onListItemPressed={this.onListItemPressed}
          />
        </div>
      );
    }
    return result;
  }
}

export default Content;
