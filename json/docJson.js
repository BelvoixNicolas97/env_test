/**
 * La variable est un fichier qui contient le texte du package.
 * @global
 * @name TXT
 * @type {object}
 * @property {object} foldSystem Contient le texte de la [Class FoldSystem]{@link module:foldSystem~FoldSystem}.
 * @property {object} foldSystem.createDirPrincipal Contient le texte de [Class FoldSystem.createDirPrincipal()]{@link module:foldSystem~FoldSystem#createDirPrincipal}.
 * @property {string} foldSystem.createDirPrincipal.errorTypePath Contient le texte d'erreur sur le type de paramétre.</br>
 *                                                               Remplacer "@typePath@" par le type de la variable.
 * @property {string} foldSystem.createDirPrincipal.errorPathFile Contient le texte d'erreur si le dossier est un fichier au lieu d'un dossier.</br>
 *                                                                Remplacer "@path@" par l'url du dossier.
 * @property {object} foldSystem.createDirTest Contient le texte de [Class FoldSystem.createDirTest()]{@link module:foldSystem~FoldSystem#createDirTest}.
 * @property {string} foldSystem.createDirTest.errorTypeNameDir Contient le texte d'erreur si le nom du dossier de test n'est pas une chaine de caractère.</br>
 *                                                              Remplacer "@typeNameTest@" par le nom du test.
 * @property {object} foldSystem.cleanDir Contient le texte de [Class FoldSystem.cleanDir()]{@link module:foldSystem~FoldSystem#cleanDir}.
 * @property {object} foldSystem.cleanDir.errorTypePath Contient le texte d'erreur si le nom du dossier a netoyer de test n'est pas une chaine de caractère.</br>
 *                                                      Remplacer "@typePath@" par le type.
 * @property {object} foldSystem.cleanDir.errorNotExist Contient le texte d'erreur si le dossier a netoyer n'existe pas.</br>
 *                                                      Remplacer "@path@" par le chemin du dossier.
 * @property {object} foldSystem.cleanDir.errorDir Contient le texte d'erreur si le dossier a netoyer n'est pas un dossier.</br>
 *                                                      Remplacer "@path@" par le chemin du dossier.
 */

/**
 * @global
 * @name ERROR
 * @type {object}
 * @property {string} paramType="PARAM_TYPE" Le code erreur est utiliser si le type de paramètre est erroenr.
 * @property {string} typePath="TYPE_PATH" Le code erreur est utiliser si le type de fichier est erroner.</br>
 *                                         Il sera utiliser par exemple si il y a un fichier au lieu d'un dossier.
 * @property {string} dirNotExist="DIR_NOT_EXIST" Le code erreur est utiliser si un dossier n'existe pas.
 */