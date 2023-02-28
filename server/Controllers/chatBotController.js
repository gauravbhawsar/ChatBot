const dialogflow = require("@google-cloud/dialogflow");
const { IntentsClient } = require("@google-cloud/dialogflow");
const uuid = require("uuid");

const runSample = async (req, res) => {
  // A unique identifier for the given session
  const sessionId = uuid.v4();
  const projectId = "chatbot-351910";
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: "server/chatbot-351910-4380cdca6b18.json",
  });
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: req.body.text,
        // The language used by the client (en-US)
        languageCode: "en-US",
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    res.send(result.fulfillmentText);
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log("  No intent matched.");
  }
};
const createInt = async (req, res) => {
  const {
    displayName,
    trainingPhrasesParts,
    messageTexts,
    entityName,
    paraName,
    paraDisplayName,
  } = req.body;
  const projectId = "chatbot-351910";

  console.log(
    projectId,
    displayName,
    trainingPhrasesParts,
    messageTexts,
    entityName,
    paraName,
    paraDisplayName
  );

  try {
    async function createIntent() {
      const intentsClient = new dialogflow.IntentsClient();
      const agentPath = intentsClient.projectAgentPath(projectId);
      console.log(projectId);
      const trainingPhrases = [];

      trainingPhrasesParts.forEach((trainingPhrasesPart) => {
        const part = trainingPhrasesPart;

        // Here we create a new training phrase for each provided part.
        const trainingPhrase = {
          type: "EXAMPLE",
          parts: [part],
        };

        trainingPhrases.push(trainingPhrase);
      });
      const messageText = {
        text: messageTexts,
      };

      const message = {
        text: messageText,
      };
      console.log(message);
      console.log(trainingPhrases);
      const parameters = [
        {
          entityTypeDisplayName: entityName,
          displayName: paraDisplayName,
          name: paraName,
        },
      ];
      const intent = {
        displayName: displayName,
        trainingPhrases: trainingPhrases,
        messages: [message],
        // parameters: parameters,
        webhookState: "WEBHOOK_STATE_ENABLEDx`",
      };

      const createIntentRequest = {
        parent: agentPath,
        intent: intent,
      };

      // Create the intent

      const response = await intentsClient.createIntent(createIntentRequest);
      if (response != undefined) {
        res.sendStatus(200);
      }
    }
    createIntent();
  } catch (err) {
    // console.log("hihii" + err.message);
    res.sendStatus(400);
  }
};
const getListIntent = (req, res) => {
  try {
    const projectId = process.env.PROJECTID;
    console.log(projectId);
    const intentsClient = new dialogflow.IntentsClient({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });
    async function listIntents() {
      const projectAgentPath = intentsClient.projectAgentPath(projectId);
      console.log(projectAgentPath);
      const request = {
        parent: projectAgentPath,
      };
      // Send the request for listing intents.
      const [response] = await intentsClient.listIntents(request);
      let names = [];
      if (response.length > 0) {
        response.forEach((res) => {
          names.push(res.displayName);
        });
      }
      if (names.length > 0) {
        return res.send(names);
      }
    }

    listIntents();
  } catch (err) {
    res.send(err);
  }
};
const updateIntent = async (req, res) => {
  const { intentId, displayName } = req.body;
  const intentClient = new IntentsClient();
  try {
    const agentPath = intentClient.projectAgentPath(process.env.PROJECTID);
    const intentPath = agentPath + "/intents/" + intentId;

    const intent = await intentClient.getIntent({ name: intentPath });
    intent[0].displayName = displayName;
    const updateMask = {
      paths: ["display_name"],
    };

    const updateIntentRequest = {
      intent: intent[0],
      updateMask: updateMask,
      languageCode: "en",
    };

    const result = await intentClient.updateIntent(updateIntentRequest);
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
module.exports = { runSample, createInt, getListIntent, updateIntent };
