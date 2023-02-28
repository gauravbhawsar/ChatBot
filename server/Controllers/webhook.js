const handleWebhook = async (request, response) => {
  const tag = request.body.queryResult.intent.displayName;
  const query = request.body.queryResult.queryText;
  let jsonResponse = {};

  if (tag === "Default Welcome Intent") {
    if (query === "hi what is your name") {
      //fulfillment response to be sent to the agent if the request tag is equal to "welcome tag"
      jsonResponse = {
        fulfillment_messages: [
          {
            text: {
              //fulfillment text response to be sent to the agent
              text: ["Hello my name is gaurav"],
            },
          },
        ],
      };
    } else if (query === "hi") {
      jsonResponse = {
        fulfillment_messages: [
          {
            text: {
              //fulfillment text response to be sent to the agent
              text: ["Hello, how are you"],
            },
          },
        ],
      };
    }
  } else if (tag === "get-name") {
    //fulfillment response to be sent to the agent if the request tag is equal to "welcome tag"
    jsonResponse = {
      fulfillment_messages: [
        {
          text: {
            //fulfillment text response to be sent to the agent
            text: ["My name is Flowhook"],
          },
        },
      ],
    };
  } else if (tag === "cars") {
    const response = request.body.queryResult.parameters;
    const tex = response.Cars;
    jsonResponse = {
      fulfillment_messages: [
        {
          text: {
            //fulfillment text response to be sent to the agent
            text: [tex],
          },
        },
      ],
    };
  } else if (tag === "bikes") {
    const response = request.body.queryResult.parameters;
    const tex = response.bike;
    jsonResponse = {
      fulfillment_messages: [
        {
          text: {
            //fulfillment text response to be sent to the agent
            text: [tex],
          },
        },
      ],
    };
  } else if (tag === "truks") {
    const response = request.body.queryResult.parameters;
    const tex = response.truks;
    jsonResponse = {
      fulfillment_messages: [
        {
          text: {
            //fulfillment text response to be sent to the agent
            text: [tex],
          },
        },
      ],
    };
  } else {
    jsonResponse = {
      //fulfillment text response to be sent to the agent if there are no defined responses for the specified tag
      fulfillment_messages: [
        {
          text: {
            ////fulfillment text response to be sent to the agent
            text: [
              `There are no fulfillment responses defined for "${tag}"" tag`,
            ],
          },
        },
      ],
    };
  }
  response.send(jsonResponse);
};
module.exports = { handleWebhook };
