/**
 * La variable est un fichier qui contient le texte du package.
 * @global
 * @name TXT
 * @type {object}
 * @property {object} foldSystem Contient le texte de la [Class FoldSystem]{@link module:foldSystem~FoldSystem}.
 * @property {object} foldSystem.createDirPrincipal Contient le texte de la fonction [Class FoldSystem.createDirPrincipal()]{@link module:foldSystem~FoldSystem#createDirPrincipal}.
 * @property {string} foldSystem.createDirPrincipal.errorTypePath Contient le texte d'erreur si le type du paramètre soumis est erroné.</br>
 *                                                               Remplacer "@typePath@" par le type de la variable soumis.
 * @property {string} foldSystem.createDirPrincipal.errorPathFile Contient le texte d'erreur si l'URL soumise n'existe pas ou si l'URL est un fichier.</br>
 *                                                                Remplacer "@path@" par l'url du dossier.
 * @property {object} foldSystem.createDirTest Contient le texte de la fonction [Class FoldSystem.createDirTest()]{@link module:foldSystem~FoldSystem#createDirTest}.
 * @property {string} foldSystem.createDirTest.errorTypeNameDir Contient le texte d'erreur si le nom du dossier de test n'est pas une chaine de caractères.</br>
 *                                                              Remplacer "@typeNameTest@" par le nom du test.
 * @property {object} foldSystem.getTestUrl Contient le texte de la fonction [Class FoldSystem.getTestUrl()]{@link module:foldSystem~FoldSystem#getTestUrl}.
 * @property {string} foldSystem.getTestUrl.notInList Contient le texte d'erreur si le nom du test [Class FoldSystem.LIST_TEST]{@link module:foldSystem~FoldSystem#LIST_TEST} ne fait pas partie de la liste de test connue.
 *                                                    Remplacer "@nameTest@" par le nom du test.
 * @property {object} fileLog Contient le texte de la [Class FileLog]{@link module:fileLog~FileLog}.
 * @property {object} fileLog.constructor Contient le texte de la fonction [Class FileLog.constructor()]{@link module:fileLog~FileLog}.
 * @property {string} fileLog.constructor.errorTypePath Contient le texte d'erreur si l'URL du fichier log n'est pas une chaine de caractères.</br>
 *                                                      Remplacer "@typeParh@" par le type de la variable soumis.
 * @property {string} fileLog.constructor.errorTypeFile Contient le texte d'erreur si l'URL du fichier log n'est pas un fichier.</br>
 *                                                      Remplacer "@path@" par l'URL du fichier.
 * @property {object} fileLog.getByte Contient le texte de la fonction [Class FileLog.getByte()]{@link module:fileLog~FileLog#getByte}.
 * @property {string} fileLog.getByte.errorClose Contient le texte d'erreur si le fichier de log est fermé.</br>
 *                                               Remplacer "@path@" par l'URL du fichier et "@fn@" par le numéro du descripteur de fichier.
 * @property {object} fileLog.write Contient le texte de la fonction [Class FileLog.write()]{@link module:fileLog~FileLog#write}.
 * @property {string} fileLog.write.errorTypeParam Contient le texte d'erreur si le texte à écrire n'est pas une chaine de caractères.</br>
 *                                                 Remplacer "@path@" par l'URL du fichier et "@typeTxt@" par le type de la variable soumis.
 * @property {string} fileLog.write.errorClose Contient le texte d'erreur si le fichier de log est fermé.</br>
 *                                             Remplacer "@path@" par l'URL du fichier et "@fn@" par le numéro du descripteur de fichier.
 * @property {Object} envTest Contient le texte de la [Class EnvTest]{@link module:envTest~EnvTest}.
 * @property {object} envTest.setPathWork Contient le texte de la fonction [Class EnvTest.setPathWork()]{@link module:envTest~EnvTest#setPathWork}.
 * @property {string} envTest.setPathWork.errorType Contient le texte d'erreur si l'URL du dossier de test n'est pas une chaine de caractère.</br>
 *                                                  Remplacer "@typePath@" par le type de variable resu comme URL du dossier de test.
 * @property {string} envTest.setPathWork.errorNotExist Contient le texte d'erreur si l'URL du dossier de test n'existe pas.</br>
 *                                                      Remplacer "@path@" par l'URL du dossier de test.
 * @property {string} envTest.setPathWork.errorNotFold Contient le texte d'erreur si l'URL du dossier n'est pas un dossier.</br>
 *                                                     Remplacer "@path@" par l'URL du dossier de test.
 * @property {object} envTest.getListTest Contient le texte de la fonction [Class EnvTest.getListTest()]{@link module:envTest~EnvTest#getListTest}.
 * @property {string} envTest.getListTest.errorType Contient le texte d'erreur si le nom du module n'est pas une chaine de caractère.</br>
 *                                                  Remplacer "@typeModule@" par le type de la variable reçue.
 * @property {string} envTest.getListTest.errorInList Contient le texte d'erreur si le module n'existe pas dans la liste de test.</br>
 *                                                    Remplacer "@module@" par le nom du module.
 * @property {object} envTest.test Contient le texte de la fonction [Class EnvTest.test()]{@link module:envTest~EnvTest#test}.
 * @property {string} envTest.test.errorNotInListModule Contient le texte d'erreur si le module ne fait pas partie de la liste de test.</br>
 *                                                      Remplacer "@module@" par le nom du module.
 * @property {string} envTest.test.errorNotInListTest Contient le texte d'erreur si le test ne fait pas partie du module.</br>
 *                                                    Remplacer "@module@" par le nom du module et "@test@" par le nom du test.
 * @property {string} envTest.test.terminalTitre Contient le titre du terminal.</br>
 *                                               Remplacer "@module@" par le nom du module et "@test@" par le nom du test.
 * @property {string} envTest.test.titreTest Contient le titre du test.</br>
 *                                           Remplacer "@module@" par le nom du module et "@test@" par le nom du test.
 * @property {string} envTest.test.errorTest Contient le texte d'erreur du test.</br>
 *                                           Remplacer "@module@" par le nom du module et "@test@" par le nom du test.
 */

/**
 * @global
 * @name ERROR
 * @type {object}
 * @property {string} paramType="PARAM_TYPE" Le code erreur est utilisé si le type de paramètre est erroné.
 * @property {string} typePath="TYPE_PATH" Le code erreur est utilisé si le type de fichier est erroné.</br>
 *                                         Il sera utilisé par exemple s'il y a un fichier au lieu d'un dossier.
 * @property {string} notInList="NOT_IN_LIST" Le code d'erreur est utilisé si le test ne fait pas partie de la liste [Class FoldSystem.LIST_TEST]{@link module:foldSystem~FoldSystem#LIST_TEST}.
 * @property {string} fileClose="FILE_CLOSE" Le code d'erreur est utilisé quand le fichier est déjà fermé.
 * @property {string} notInListTest="NOT_IN_LIST_TEST" Le code d'erreur est utilisé quand un module ou un test ne fait pas partie de [Class EnvTest.LIST_TEST]{@link module:envTest~EnvTest#LIST_TEST}.
 */