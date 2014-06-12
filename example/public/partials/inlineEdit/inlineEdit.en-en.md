
#bbc.inline.edit

- - -

Baboon provides the service $bbcInlineEdit, which makes it possible to reset objects after changes. The objects can be populated with validation errors.

The service keeps the data in the model. When creating the models, the model-data are stored in the master. This allows the model reset back to its original data and determine changes to the model.

For more Details please check out our <a href="/doc#/api/bbc.inline.edit.$bbcInlineEdit" target="_self">api reference</a>.

###Methods

 * isChanged: Check if the model has changes.
 * populateValidation: Add server validation to form.
 * reset: Resets the model to the master.
 * setModel: Create a model and set master.

- - -

###Example