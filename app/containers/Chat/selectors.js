import { createSelector } from 'reselect';

const selectChat = (state) => state.get('chat');

const makeSelectMessages = () => createSelector(
  selectChat,
  (chatState) => chatState.get('messages'),
);

/**
 * Select messages in bulks. a bulk is a list of consecutive messages bvy the same user
 */
const makeSelectMessagesBulked = () => createSelector(
  makeSelectMessages(),
  (messages) => {
    if (!messages) {
      return [];
    }

    const bulks = [];
    let lastBulk = {
      user: null,
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
