
#bbc.form

- - -

The module bbc.form includes a service which simplifies working with forms. This service provides functionality for caching, handle server errors, check changes and reset the model.

For more Details please check out our  <a href="/doc#/api/bbc.form.$bbcForm" target="_self">api reference</a>.

###Methods of the form service

 * setModel: Set the model
 * hasLoadedModelFromCache: Load model from cache
 * isUnchanged: Check model for changes
 * populateValidation: Map server validation for the form
 * reset: Reset the model

###Initialize $bbcModal

The Modalservice will be initialized with the model name and a key, which is a property of the model. If the key specified, its model value is used as the key for the cache, otherwise the model name will be used.