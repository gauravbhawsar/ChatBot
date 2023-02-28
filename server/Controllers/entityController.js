const dialogflow = require("@google-cloud/dialogflow");
const EntityClient = new dialogflow.EntityTypesClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});
const CreateEntity = async (req, res) => {
  const { displayName, entities } = req.body;
  const projectId = process.env.PROJECTID;
  try {
    const agentPath = EntityClient.projectAgentPath(projectId);
    const entites = {
      displayName: displayName,
      kind: "KIND_MAP",
      entities: entities,
    };
    const request = {
      parent: agentPath,
      entityType: entites,
    };
    const response = await EntityClient.createEntityType(request);

    return res.send(response);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};
module.exports = { CreateEntity };
