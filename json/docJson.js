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
 */

/**
 * @global
 * @name ERROR
 * @type {object}
 * @property {string} paramType="PARAM_TYPE" Le code erreur est utilisé si le type de paramètre est erroné.
 * @property {string} typePath="TYPE_PATH" Le code erreur est utilisé si le type de fichier est erroné.</br>
 *                                         Il sera utilisé par exemple s'il y a un fichier au lieu d'un dossier.
 * @property {string} notInList="NOT_IN_LIST_TEST" Le code d'erreur est utilisé si le test ne fait pas partie de la liste [Class FoldSystem.LIST_TEST]{@link module:foldSystem~FoldSystem#LIST_TEST}.
 */