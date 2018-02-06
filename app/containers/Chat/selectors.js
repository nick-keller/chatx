import { createSelector } from 'reselect';

const selectChat = (state) => state.get('chat');

const makeSelectMessages = () => createSelector(
  selectChat,
  (chatState) => chatState.get('messages'),
);

const makeSelectMessagesBulked = () => createSelector(
  makeSelectMessages(),
  (messages) => {
    if (!messages) {
      return [];
    }

    const bulks = [];
    let lastBulk = {
      messages: [],
    };

    messages.forEach((message, key) => {
      if (message.get('user') !== lastBulk.user) {
        if (lastBulk.user) {
          bulks.push(lastBulk);
          lastBulk = {
            messages: [],
          };
        }

        lastBulk.user = message.get('user');
        lastBulk.id = key;
      }

      lastBulk.messages.push(message.get('message'));
    });

    if (lastBulk.user) {
      bulks.push(lastBulk);
    }

    return bulks;
  },
);

export {
  makeSelectMessagesBulked,
};
