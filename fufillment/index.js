const {conversation} = require('@assistant/conversation');
const functions = require('firebase-functions');

const app = conversation();

app.handle('stackr_push', (conv) => {
  console.log('Stackr-push');
  conv.overwrite = false;
  conv.scene.next = { name: 'actions.scene.END_CONVERSATION' };
  // conv.add('Hello world from fulfillment');
  if (!conv.user.params.stackr) {
    conv.user.params.stackr = [];
  }
  if (!conv.intent.params.item) {
  	conv.user.params.stackr_push = "nothing! Say Idea Stack push followed by something to push onto your stack. For example, Stack Bot push pencil crayons will add pencil crayons to your stack!";
  } else {
    conv.user.params.stackr.push(conv.intent.params.item.resolved);
    conv.user.params.stackr_push = conv.user.params.stackr[conv.user.params.stackr.length - 1];
  }
});

app.handle('stackr_peek', (conv) => {
  console.log('Stackr-peek');
  conv.overwrite = false;
  conv.scene.next = { name: 'actions.scene.END_CONVERSATION' };
  // conv.add('Hello world from fulfillment');
  if (!conv.user.params.stackr || conv.user.params.stackr.length == 0) {
    conv.user.params.stackr = [];
  	conv.user.params.stackr_peek = "Nothing's in your stack, try saying Idea Stack push to add some stuff!";
  } else {
  	conv.user.params.stackr_peek = conv.user.params.stackr[conv.user.params.stackr.length - 1];
  }
});

app.handle('stackr_pop', (conv) => {
  console.log('Stackr-pop');
  conv.overwrite = false;
  conv.scene.next = { name: 'actions.scene.END_CONVERSATION' };
  // conv.add('Hello world from fulfillment');
  if (!conv.user.params.stackr || conv.user.params.stackr.length == 0) {
    conv.user.params.stackr = [];
  	conv.user.params.stackr_pop = "nothing! Try saying Idea Stack push to add some stuff!";
  } else {
  	conv.user.params.stackr_pop = conv.user.params.stackr.pop();
  }
});

exports.ActionsOnGoogleFulfillment = functions.https.onRequest(app);
