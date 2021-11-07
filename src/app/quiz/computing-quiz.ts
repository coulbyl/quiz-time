import { Quiz } from './quiz.model';

export const computingQuiz: Quiz[] = [
  {
    name: 'q1',
    question: 'Le nombre binaire 1011 vaut en décimal',
    responses: ['7', '9', '33', '11'],
    response: '11',
  },
  {
    name: 'q2',
    question: 'Le nombre qui suit le nombre 4 en base 5 est :',
    responses: ['10', '5', '0', 'A'],
    response: '5',
  },
  {
    name: 'q3',
    question: "Combien y'a t­il d'octets dans un ko (kilo­octet) ?",
    responses: ['1000', '1024', '1048', '2048'],
    response: '1024',
  },
  {
    name: 'q4',
    question: 'Combien de bytes y­-a­-t-­il dans un Giga­Octet ?',
    responses: ['1.000.000', '1.048.576.000', '1.073.741.824', '1.024.024.024'],
    response: '1.073.741.824',
  },
  {
    name: 'q5',
    question: 'Un clavier français est un clavier ?',
    responses: ['AZERTY', 'QWERTY', 'Type 12', 'Type 02'],
    response: 'AZERTY',
  },
  {
    name: 'q6',
    question: "Qu'est-­ce qu'un upgrade ?",
    responses: [
      'Une mise à jour',
      "Le chargement d'un fichier informatique vers un autre ordinateur",
      "Un diplôme d'informaticien",
      'Un système d’exploitation',
    ],
    response: 'Une mise à jour',
  },
  {
    name: 'q7',
    question: 'Sous Windows XP, la configuration est enregistré dans ?',
    responses: [
      'Le fichier autoexec.bat',
      'Le fichier win.ini',
      'La base de registre',
      'La base de composants de windows',
    ],
    response: 'La base de registre',
  },
  {
    name: 'q8',
    question: 'TIFF est un format :',
    responses: [
      'd’images',
      'de base de données',
      'de Terminal Informatique de type FF',
      'de protocole internet',
    ],
    response: 'd’images',
  },
  {
    name: 'q9',
    question: "En gestion de projet qui appelle­-t-­on maîtrise d'ouvrage ?",
    responses: [
      'le client',
      'le prestataire',
      'la société chargée de l’accompagnement',
      'les utilisateurs',
    ],
    response: 'la société chargée de l’accompagnement',
  },
  {
    name: 'q10',
    question: 'UML est :',
    responses: [
      'La partie « données » de la méthode MERISE',
      'un standard de communication',
      'un type de port',
      'un langage de modélisation',
    ],
    response: 'un langage de modélisation',
  },
  {
    name: 'q11',
    question: "L'adresse de « classe A » comprend ?",
    responses: ['16 millions d’adresses', '65.000 adresses', '256 adresses'],
    response: '16 millions d’adresses',
  },
  {
    name: 'q12',
    question: 'Quel est le système disque standard des PC ?',
    responses: ['IDE', 'SCSI', 'RAID'],
    response: 'IDE',
  },
  {
    name: 'q13',
    question:
      'Pour séparer un disque dur physique en deux disques logiques, il faut :',
    responses: ['Formater le disque', 'Le partitionner', 'Le partager'],
    response: 'Le partitionner',
  },
  {
    name: 'q14',
    question: 'Quel est l’atout de la technologie RAID ?',
    responses: [
      'Le contrôle des données',
      'la protection contre le piratage',
      'la performance',
    ],
    response: 'la performance',
  },
  {
    name: 'q15',
    question: 'Une mémoire ne peut pas être de type ?',
    responses: ['ROM', 'RUM', 'RAM'],
    response: 'RUM',
  },
  {
    name: 'q16',
    question:
      "Comment se nomme l'unité minimale allouée par un disque dur lors d'une opération d'écriture ?",
    responses: ['Le secteur', 'Le cluster', 'La FAT', 'Le block'],
    response: 'Le cluster',
  },
  {
    name: 'q17',
    question: 'Un firewall (pare feu), trouver l’affirmation fausse :',
    responses: [
      'peut bloquer les intrusions sur votre ordinateur',
      'vous protège des virus',
      'peut interdire l’accès à certains sites',
    ],
    response: 'vous protège des virus',
  },
  {
    name: 'q18',
    question: 'Quel code de réponse HTTP 1.0 est faux ?',
    responses: [
      '200 : la requête s’est déroulée correctement',
      '400 : erreur de syntaxe dans la requête envoyé par le client',
      '404 : la ressource demandée n’existe pas',
      '500 : requête acceptée, traitement en cours',
    ],
    response: '500 : requête acceptée, traitement en cours',
  },
  {
    name: 'q19',
    question: 'Un cookie sur internet, peut ?',
    responses: [
      'être un programme',
      'contenir un virus',
      'paramétrer de façon personnalisé la page d’accueil d’un site web',
      'saturer votre disque dur',
    ],
    response:
      'paramétrer de façon personnalisé la page d’accueil d’un site web',
  },
  {
    name: 'q20',
    question:
      'Une URL (Uniform Resource Locator) est composé obligatoirement de certains éléments, ci dessous, un est facultatif :',
    responses: [
      'du protocole de communication',
      'du nom du serveur',
      'du port',
    ],
    response: 'du port',
  },
];
