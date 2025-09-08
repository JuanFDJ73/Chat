import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

// Traducciones
const translations = {
  es: {
    // Navigation
    back: 'Atrás',
    
    // Language Page
    languageSettings: 'Configuración de Idioma',
    selectLanguage: 'Selecciona tu idioma preferido',
    currentLanguage: 'Idioma actual',
    
    // Languages
    spanish: 'Español',
    english: 'English',
    french: 'Français',
    portuguese: 'Português',
    
    // Common
    save: 'Guardar',
    cancel: 'Cancelar',
    apply: 'Aplicar',
    
    // Preview Section
    preview: 'Vista Previa',
    previewText: 'Así se verá la aplicación en este idioma',
    sampleMessage: 'Este es un mensaje de ejemplo',
    sampleReply: 'Esta es una respuesta de ejemplo',
    typing: 'escribiendo...',
    online: 'en línea',
    
    // Settings
    settings: 'Configuraciones',
    profile: 'Perfil',
    notifications: 'Notificaciones',
    privacy: 'Privacidad',
    about: 'Acerca de',
    help: 'Ayuda',
    logout: 'Cerrar Sesión',
    darkMode: 'Modo Oscuro',
    changeTheme: 'Cambiar tema de la aplicación',
    receiveNotifications: 'Recibir notificaciones de mensajes',
    changeLanguage: 'Cambiar idioma de la aplicación',
    privacySettings: 'Configuración de privacidad',
    appInfo: 'Información de la aplicación',
    helpCenter: 'Centro de ayuda y soporte',
    version: 'Versión',

    // Profile
    editProfile: 'Editar Perfil',
    changePassword: 'Cambiar Contraseña',
    deleteAccount: 'Eliminar Cuenta',
    name: 'Nombre',
    description: 'Descripción',
    email: 'Correo Electrónico',
    memberSince: 'Miembro desde',
    myProfile: 'Mi Perfil',
    edit: 'Editar',
    viewImage: 'Ver imagen',
    changeImage: 'Cambiar imagen',
    addImage: 'Agregar imagen',
    deleteImage: 'Eliminar imagen',
    changingImage: 'Cambiando imagen...',
    noDescription: 'Sin descripción',
    notAvailable: 'No disponible',
    userAvatar: 'Avatar del usuario',

    // Dates
    today: 'Hoy',
    yesterday: 'Ayer',
    sunday: 'Domingo',
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',

    // About Page
    chatAppProject: 'Chat App - Proyecto Personal',
    projectIntro: 'Esta aplicación de chat es un proyecto personal desarrollado para explorar y dominar tecnologías modernas de desarrollo web. Ha sido una experiencia increíble de aprendizaje que me ha permitido profundizar en el desarrollo full-stack.',
    learningObjectives: 'Objetivos de Aprendizaje',
    objective1: 'Dominar React.js y el desarrollo de SPAs (Single Page Applications)',
    objective2: 'Implementar comunicación en tiempo real con WebSockets',
    objective3: 'Crear APIs RESTful con Node.js y Express',
    objective4: 'Gestionar estado global de la aplicación',
    objective5: 'Desarrollar interfaces de usuario responsivas y modernas',
    objective6: 'Implementar autenticación y autorización segura',
    technologiesImplemented: 'Tecnologías Implementadas',
    featuresImplemented: 'Características Implementadas',
    realtimeChat: 'Chat en tiempo real con Socket.io',
    authSystem: 'Sistema de autenticación completo',
    responsiveDesign: 'Diseño responsive para móviles y desktop',
    darkLightMode: 'Modo oscuro y claro',
    contactManagement: 'Gestión de contactos y conversaciones',
    modernInterface: 'Interfaz moderna con animaciones',
    developedWithLove: 'Desarrollado con',
    developerMessage: 'Este proyecto representa mi pasión por el desarrollo web y mi deseo constante de aprender nuevas tecnologías y mejores prácticas.',
    viewGithub: 'Ver mi GitHub',
    thanksMessage: '¡Gracias por explorar mi proyecto! Espero que disfrutes usando esta aplicación tanto como yo disfruté desarrollándola.',
    reactDescription: 'Frontend moderno con hooks y componentes funcionales',
    socketDescription: 'Comunicación en tiempo real para chat instantáneo',
    nodeDescription: 'Backend robusto con Express.js',
    mongoDescription: 'Base de datos NoSQL para almacenamiento',

    // Help Page
    helpTitle: 'Centro de Ayuda',
    frequentQuestions: 'Preguntas Frecuentes',
    contactUs: 'Contáctanos',
    sendFeedback: 'Enviar Comentarios',
    termsConditions: 'Términos y Condiciones',
    privacyPolicy: 'Política de Privacidad',
    troubleshooting: 'Solución de problemas',
    
    // FAQ
    faqQuestion1: '¿Cómo envío un mensaje?',
    faqAnswer1: 'Selecciona un contacto de tu lista y escribe tu mensaje en la parte inferior de la pantalla.',
    faqQuestion2: '¿Cómo agrego nuevos contactos?',
    faqAnswer2: 'Ve a la página principal y haz clic en el botón "+" para buscar y agregar nuevos contactos.',
    faqQuestion3: '¿Cómo cambio mi foto de perfil?',
    faqAnswer3: 'Ve a tu perfil, haz clic en tu imagen actual y selecciona "Cambiar imagen".',
    faqQuestion4: '¿Puedo usar la aplicación sin conexión?',
    faqAnswer4: 'No, necesitas conexión a internet para enviar y recibir mensajes.',
    
    // Contact
    contactEmail: 'juanfdj73@gmail.com',
    contactSubject: 'Soporte - Chat App',
    contactMessage: 'Hola, necesito ayuda con...',
    openEmail: 'Abrir correo electrónico',
    addToContacts: 'Agregar a contactos',
    
    // Feedback
    feedbackTitle: 'Enviar comentarios',
    feedbackDescription: 'Ayúdanos a mejorar la aplicación con tus sugerencias',
    feedbackPlaceholder: 'Escribe tus comentarios aquí...',
    sendFeedbackBtn: 'Enviar comentarios',
    feedbackSent: 'Comentarios enviados correctamente',
    
    // Terms & Conditions
    termsTitle: 'Términos y Condiciones',
    termsContent1: 'Al usar esta aplicación, aceptas cumplir con estos términos y condiciones.',
    termsContent2: 'Esta aplicación es un proyecto educativo y personal.',
    termsContent3: 'No nos hacemos responsables por el mal uso de la aplicación.',
    termsContent4: 'Los datos se almacenan de forma segura y no se comparten con terceros.',
    
    // Troubleshooting
    troubleshootingTitle: 'Solución de problemas',
    problem1: 'Los mensajes no se envían',
    solution1: 'Verifica tu conexión a internet y vuelve a intentar.',
    problem2: 'No puedo agregar contactos',
    solution2: 'Asegúrate de escribir correctamente el email del contacto.',
    problem3: 'La aplicación va lenta',
    solution3: 'Cierra otras aplicaciones y verifica tu conexión.',

    // Privacy Policy
    privacyTitle: 'Política de Privacidad',
    privacyContent1: 'Esta aplicación de chat es un proyecto educativo y personal. Tu privacidad es importante para nosotros.',
    privacyContent2: 'Recopilamos únicamente la información necesaria para el funcionamiento de la aplicación: email, nombre de usuario y mensajes.',
    privacyContent3: 'Los datos se almacenan de forma segura y encriptada. No compartimos tu información personal con terceros.',
    privacyContent4: 'Tienes derecho a solicitar la eliminación de tus datos en cualquier momento contactando al desarrollador.',
    privacyContent5: 'Los mensajes se almacenan temporalmente para permitir la sincronización entre dispositivos.',
    privacyContent6: 'Utilizamos autenticación segura a través de Firebase para proteger tu cuenta.',
    privacyContent7: 'No utilizamos cookies de seguimiento ni analizamos tu comportamiento para fines publicitarios.',
    privacyContent8: 'Al usar esta aplicación, aceptas el tratamiento de tus datos según esta política de privacidad.',
    
    // Privacy Sections
    dataCollection: 'Información que recopilamos',
    dataSecurity: 'Seguridad de datos',
    authentication: 'Autenticación',
    messageStorage: 'Almacenamiento de mensajes',
    noTracking: 'No seguimiento',
    userRights: 'Tus derechos',
    problem4: 'Si los problemas persisten',
    solution4: 'Asegúrate de comunicarte con el soporte técnico.'
  },
  
  en: {
    // Navigation
    back: 'Back',
    
    // Language Page
    languageSettings: 'Language Settings',
    selectLanguage: 'Select your preferred language',
    currentLanguage: 'Current language',
    
    // Languages
    spanish: 'Español',
    english: 'English',
    french: 'Français',
    portuguese: 'Português',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    apply: 'Apply',
    
    // Preview Section
    preview: 'Preview',
    previewText: 'This is how the app will look in this language',
    sampleMessage: 'This is a sample message',
    sampleReply: 'This is a sample reply',
    typing: 'typing...',
    online: 'online',
    
    // Settings
    settings: 'Settings',
    profile: 'Profile',
    notifications: 'Notifications',
    privacy: 'Privacy',
    about: 'About',
    help: 'Help',
    logout: 'Log Out',
    darkMode: 'Dark Mode',
    changeTheme: 'Change app theme',
    receiveNotifications: 'Receive message notifications',
    changeLanguage: 'Change app language',
    privacySettings: 'Privacy settings',
    appInfo: 'App information',
    helpCenter: 'Help and support center',
    version: 'Version',

    // Profile
    editProfile: 'Edit Profile',
    changePassword: 'Change Password',
    deleteAccount: 'Delete Account',
    name: 'Name',
    description: 'Description',
    email: 'Email',
    memberSince: 'Member since',
    myProfile: 'My Profile',
    edit: 'Edit',
    viewImage: 'View image',
    changeImage: 'Change image',
    addImage: 'Add image',
    deleteImage: 'Delete image',
    changingImage: 'Changing image...',
    noDescription: 'No description',
    notAvailable: 'Not available',
    userAvatar: 'User avatar',

    // Dates
    today: 'Today',
    yesterday: 'Yesterday',
    sunday: 'Sunday',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',

    // About Page
    chatAppProject: 'Chat App - Personal Project',
    projectIntro: 'This chat application is a personal project developed to explore and master modern web development technologies. It has been an incredible learning experience that has allowed me to deepen my full-stack development skills.',
    learningObjectives: 'Learning Objectives',
    objective1: 'Master React.js and SPA (Single Page Applications) development',
    objective2: 'Implement real-time communication with WebSockets',
    objective3: 'Create RESTful APIs with Node.js and Express',
    objective4: 'Manage global application state',
    objective5: 'Develop responsive and modern user interfaces',
    objective6: 'Implement secure authentication and authorization',
    technologiesImplemented: 'Implemented Technologies',
    featuresImplemented: 'Implemented Features',
    realtimeChat: 'Real-time chat with Socket.io',
    authSystem: 'Complete authentication system',
    responsiveDesign: 'Responsive design for mobile and desktop',
    darkLightMode: 'Dark and light mode',
    contactManagement: 'Contact and conversation management',
    modernInterface: 'Modern interface with animations',
    developedWithLove: 'Developed with',
    developerMessage: 'This project represents my passion for web development and my constant desire to learn new technologies and best practices.',
    viewGithub: 'View my GitHub',
    thanksMessage: 'Thanks for exploring my project! I hope you enjoy using this application as much as I enjoyed developing it.',
    reactDescription: 'Modern frontend with hooks and functional components',
    socketDescription: 'Real-time communication for instant chat',
    nodeDescription: 'Robust backend with Express.js',
    mongoDescription: 'NoSQL database for storage',

    // Help Page
    helpTitle: 'Help Center',
    frequentQuestions: 'Frequently Asked Questions',
    contactUs: 'Contact Us',
    sendFeedback: 'Send Feedback',
    termsConditions: 'Terms and Conditions',
    privacyPolicy: 'Privacy Policy',
    troubleshooting: 'Troubleshooting',
    
    // FAQ
    faqQuestion1: 'How do I send a message?',
    faqAnswer1: 'Select a contact from your list and type your message at the bottom of the screen.',
    faqQuestion2: 'How do I add new contacts?',
    faqAnswer2: 'Go to the main page and click the "+" button to search and add new contacts.',
    faqQuestion3: 'How do I change my profile picture?',
    faqAnswer3: 'Go to your profile, click on your current image and select "Change image".',
    faqQuestion4: 'Can I use the app offline?',
    faqAnswer4: 'No, you need an internet connection to send and receive messages.',
    
    // Contact
    contactEmail: 'juanfdj73@gmail.com',
    contactSubject: 'Support - Chat App',
    contactMessage: 'Hello, I need help with...',
    openEmail: 'Open email',
    addToContacts: 'Add to contacts',
    
    // Feedback
    feedbackTitle: 'Send feedback',
    feedbackDescription: 'Help us improve the app with your suggestions',
    feedbackPlaceholder: 'Write your feedback here...',
    sendFeedbackBtn: 'Send feedback',
    feedbackSent: 'Feedback sent successfully',
    
    // Terms & Conditions
    termsTitle: 'Terms and Conditions',
    termsContent1: 'By using this application, you agree to comply with these terms and conditions.',
    termsContent2: 'This application is an educational and personal project.',
    termsContent3: 'We are not responsible for misuse of the application.',
    termsContent4: 'Data is stored securely and not shared with third parties.',
    
    // Troubleshooting
    troubleshootingTitle: 'Troubleshooting',
    problem1: 'Messages are not sending',
    solution1: 'Check your internet connection and try again.',
    problem2: 'I cannot add contacts',
    solution2: 'Make sure to correctly type the contact\'s email.',
    problem3: 'The app is slow',
    solution3: 'Close other apps and check your connection.',

    // Privacy Policy
    privacyTitle: 'Privacy Policy',
    privacyContent1: 'This chat application is an educational and personal project. Your privacy is important to us.',
    privacyContent2: 'We collect only the information necessary for the app to function: email, username, and messages.',
    privacyContent3: 'Data is stored securely and encrypted. We do not share your personal information with third parties.',
    privacyContent4: 'You have the right to request deletion of your data at any time by contacting the developer.',
    privacyContent5: 'Messages are stored temporarily to allow synchronization between devices.',
    privacyContent6: 'We use secure authentication through Firebase to protect your account.',
    privacyContent7: 'We do not use tracking cookies or analyze your behavior for advertising purposes.',
    privacyContent8: 'By using this application, you agree to the processing of your data according to this privacy policy.',
    
    // Privacy Sections
    dataCollection: 'Information we collect',
    dataSecurity: 'Data security',
    authentication: 'Authentication',
    messageStorage: 'Message storage',
    noTracking: 'No tracking',
    userRights: 'Your rights',
    problem4: 'If the problems persist',
    solution4: 'Make sure to contact support.'

  },
  
  fr: {
    // Navigation
    back: 'Retour',
    
    // Language Page
    languageSettings: 'Paramètres de Langue',
    selectLanguage: 'Sélectionnez votre langue préférée',
    currentLanguage: 'Langue actuelle',
    
    // Languages
    spanish: 'Español',
    english: 'English',
    french: 'Français',
    portuguese: 'Português',
    
    // Common
    save: 'Enregistrer',
    cancel: 'Annuler',
    apply: 'Appliquer',
    
    // Preview Section
    preview: 'Aperçu',
    previewText: 'Voici comment l\'application apparaîtra dans cette langue',
    sampleMessage: 'Ceci est un message d\'exemple',
    sampleReply: 'Ceci est une réponse d\'exemple',
    typing: 'en train d\'écrire...',
    online: 'en ligne',
    
    // Settings
    settings: 'Paramètres',
    profile: 'Profil',
    notifications: 'Notifications',
    privacy: 'Confidentialité',
    about: 'À propos',
    help: 'Aide',
    logout: 'Déconnexion',
    darkMode: 'Mode Sombre',
    changeTheme: 'Changer le thème de l\'application',
    receiveNotifications: 'Recevoir les notifications de messages',
    changeLanguage: 'Changer la langue de l\'application',
    privacySettings: 'Paramètres de confidentialité',
    appInfo: 'Informations sur l\'application',
    helpCenter: 'Centre d\'aide et de support',
    version: 'Version',

    // Profile
    editProfile: 'Modifier le Profil',
    changePassword: 'Changer le Mot de Passe',
    deleteAccount: 'Supprimer le Compte',
    name: 'Nom',
    description: 'Description',
    email: 'Email',
    memberSince: 'Membre depuis',
    myProfile: 'Mon Profil',
    edit: 'Modifier',
    viewImage: 'Voir l\'image',
    changeImage: 'Changer l\'image',
    addImage: 'Ajouter une image',
    deleteImage: 'Supprimer l\'image',
    changingImage: 'Changement d\'image...',
    noDescription: 'Aucune description',
    notAvailable: 'Non disponible',
    userAvatar: 'Avatar de l\'utilisateur',

    // Dates
    today: 'Aujourd\'hui',
    yesterday: 'Hier',
    sunday: 'Dimanche',
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',

    // About Page
    chatAppProject: 'Chat App - Projet Personnel',
    projectIntro: 'Cette application de chat est un projet personnel développé pour explorer et maîtriser les technologies modernes de développement web. Cela a été une expérience d\'apprentissage incroyable qui m\'a permis d\'approfondir mes compétences en développement full-stack.',
    learningObjectives: 'Objectifs d\'Apprentissage',
    objective1: 'Maîtriser React.js et le développement de SPA (Single Page Applications)',
    objective2: 'Implémenter la communication en temps réel avec WebSockets',
    objective3: 'Créer des APIs RESTful avec Node.js et Express',
    objective4: 'Gérer l\'état global de l\'application',
    objective5: 'Développer des interfaces utilisateur responsives et modernes',
    objective6: 'Implémenter l\'authentification et l\'autorisation sécurisées',
    technologiesImplemented: 'Technologies Implémentées',
    featuresImplemented: 'Fonctionnalités Implémentées',
    realtimeChat: 'Chat en temps réel avec Socket.io',
    authSystem: 'Système d\'authentification complet',
    responsiveDesign: 'Design responsive pour mobile et desktop',
    darkLightMode: 'Mode sombre et clair',
    contactManagement: 'Gestion des contacts et conversations',
    modernInterface: 'Interface moderne avec animations',
    developedWithLove: 'Développé avec',
    developerMessage: 'Ce projet représente ma passion pour le développement web et mon désir constant d\'apprendre de nouvelles technologies et meilleures pratiques.',
    viewGithub: 'Voir mon GitHub',
    thanksMessage: 'Merci d\'explorer mon projet ! J\'espère que vous apprécierez utiliser cette application autant que j\'ai apprécié la développer.',
    reactDescription: 'Frontend moderne avec hooks et composants fonctionnels',
    socketDescription: 'Communication en temps réel pour chat instantané',
    nodeDescription: 'Backend robuste avec Express.js',
    mongoDescription: 'Base de données NoSQL pour le stockage',

    // Help Page
    helpTitle: 'Centre d\'Aide',
    frequentQuestions: 'Questions Fréquemment Posées',
    contactUs: 'Nous Contacter',
    sendFeedback: 'Envoyer des Commentaires',
    termsConditions: 'Termes et Conditions',
    privacyPolicy: 'Politique de Confidentialité',
    troubleshooting: 'Dépannage',
    
    // FAQ
    faqQuestion1: 'Comment envoyer un message ?',
    faqAnswer1: 'Sélectionnez un contact dans votre liste et tapez votre message en bas de l\'écran.',
    faqQuestion2: 'Comment ajouter de nouveaux contacts ?',
    faqAnswer2: 'Allez sur la page principale et cliquez sur le bouton "+" pour rechercher et ajouter de nouveaux contacts.',
    faqQuestion3: 'Comment changer ma photo de profil ?',
    faqAnswer3: 'Allez dans votre profil, cliquez sur votre image actuelle et sélectionnez "Changer l\'image".',
    faqQuestion4: 'Puis-je utiliser l\'application hors ligne ?',
    faqAnswer4: 'Non, vous avez besoin d\'une connexion internet pour envoyer et recevoir des messages.',
    
    // Contact
    contactEmail: 'juanfdj73@gmail.com',
    contactSubject: 'Support - Chat App',
    contactMessage: 'Bonjour, j\'ai besoin d\'aide avec...',
    openEmail: 'Ouvrir l\'email',
    addToContacts: 'Ajouter aux contacts',
    
    // Feedback
    feedbackTitle: 'Envoyer des commentaires',
    feedbackDescription: 'Aidez-nous à améliorer l\'application avec vos suggestions',
    feedbackPlaceholder: 'Écrivez vos commentaires ici...',
    sendFeedbackBtn: 'Envoyer les commentaires',
    feedbackSent: 'Commentaires envoyés avec succès',
    
    // Terms & Conditions
    termsTitle: 'Termes et Conditions',
    termsContent1: 'En utilisant cette application, vous acceptez de respecter ces termes et conditions.',
    termsContent2: 'Cette application est un projet éducatif et personnel.',
    termsContent3: 'Nous ne sommes pas responsables de la mauvaise utilisation de l\'application.',
    termsContent4: 'Les données sont stockées de manière sécurisée et ne sont pas partagées avec des tiers.',
    

    // Troubleshooting
    troubleshootingTitle: 'Dépannage',
    problem1: 'Les messages ne s\'envoient pas',
    solution1: 'Vérifiez votre connexion internet et réessayez.',
    problem2: 'Je ne peux pas ajouter de contacts',
    solution2: 'Assurez-vous de taper correctement l\'email du contact.',
    problem3: 'L\'application est lente',
    solution3: 'Fermez d\'autres applications et vérifiez votre connexion.',

    // Privacy Policy
    privacyTitle: 'Politique de Confidentialité',
    privacyContent1: 'Cette application de chat est un projet éducatif et personnel. Votre confidentialité est importante pour nous.',
    privacyContent2: 'Nous collectons uniquement les informations nécessaires au fonctionnement de l\'application : email, nom d\'utilisateur et messages.',
    privacyContent3: 'Les données sont stockées de manière sécurisée et cryptée. Nous ne partageons pas vos informations personnelles avec des tiers.',
    privacyContent4: 'Vous avez le droit de demander la suppression de vos données à tout moment en contactant le développeur.',
    privacyContent5: 'Les messages sont stockés temporairement pour permettre la synchronisation entre appareils.',
    privacyContent6: 'Nous utilisons une authentification sécurisée via Firebase pour protéger votre compte.',
    privacyContent7: 'Nous n\'utilisons pas de cookies de suivi ni n\'analysons votre comportement à des fins publicitaires.',
    privacyContent8: 'En utilisant cette application, vous acceptez le traitement de vos données selon cette politique de confidentialité.',
    
    // Privacy Sections
    dataCollection: 'Informations que nous collectons',
    dataSecurity: 'Sécurité des données',
    authentication: 'Authentification',
    messageStorage: 'Stockage des messages',
    noTracking: 'Aucun suivi',
    userRights: 'Vos droits',
    problem4: 'Si les problèmes persistent',
    solution4: 'Assurez-vous de communiquer avec le support technique.'
  },
  
  pt: {
    // Navigation
    back: 'Voltar',
    
    // Language Page
    languageSettings: 'Configurações de Idioma',
    selectLanguage: 'Selecione seu idioma preferido',
    currentLanguage: 'Idioma atual',
    
    // Languages
    spanish: 'Español',
    english: 'English',
    french: 'Français',
    portuguese: 'Português',
    
    // Common
    save: 'Salvar',
    cancel: 'Cancelar',
    apply: 'Aplicar',
    
    // Preview Section
    preview: 'Visualização',
    previewText: 'Assim é como o aplicativo ficará neste idioma',
    sampleMessage: 'Esta é uma mensagem de exemplo',
    sampleReply: 'Esta é uma resposta de exemplo',
    typing: 'digitando...',
    online: 'online',
    
    // Settings
    settings: 'Configurações',
    profile: 'Perfil',
    notifications: 'Notificações',
    privacy: 'Privacidade',
    about: 'Sobre',
    help: 'Ajuda',
    logout: 'Sair',
    darkMode: 'Modo Escuro',
    changeTheme: 'Mudar tema do aplicativo',
    receiveNotifications: 'Receber notificações de mensagens',
    changeLanguage: 'Mudar idioma do aplicativo',
    privacySettings: 'Configurações de privacidade',
    appInfo: 'Informações do aplicativo',
    helpCenter: 'Centro de ajuda e suporte',
    version: 'Versão',

    // Profile
    editProfile: 'Editar Perfil',
    changePassword: 'Alterar Senha',
    deleteAccount: 'Excluir Conta',
    name: 'Nome',
    description: 'Descrição',
    email: 'Email',
    memberSince: 'Membro desde',
    myProfile: 'Meu Perfil',
    edit: 'Editar',
    viewImage: 'Ver imagem',
    changeImage: 'Alterar imagem',
    addImage: 'Adicionar imagem',
    deleteImage: 'Excluir imagem',
    changingImage: 'Alterando imagem...',
    noDescription: 'Sem descrição',
    notAvailable: 'Não disponível',
    userAvatar: 'Avatar do usuário',

    // Dates
    today: 'Hoje',
    yesterday: 'Ontem',
    sunday: 'Domingo',
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
    saturday: 'Sábado',

    // About Page
    chatAppProject: 'Chat App - Projeto Pessoal',
    projectIntro: 'Esta aplicação de chat é um projeto pessoal desenvolvido para explorar e dominar tecnologias modernas de desenvolvimento web. Foi uma experiência incrível de aprendizado que me permitiu aprofundar minhas habilidades de desenvolvimento full-stack.',
    learningObjectives: 'Objetivos de Aprendizado',
    objective1: 'Dominar React.js e desenvolvimento de SPA (Single Page Applications)',
    objective2: 'Implementar comunicação em tempo real com WebSockets',
    objective3: 'Criar APIs RESTful com Node.js e Express',
    objective4: 'Gerenciar estado global da aplicação',
    objective5: 'Desenvolver interfaces de usuário responsivas e modernas',
    objective6: 'Implementar autenticação e autorização seguras',
    technologiesImplemented: 'Tecnologias Implementadas',
    featuresImplemented: 'Funcionalidades Implementadas',
    realtimeChat: 'Chat em tempo real com Socket.io',
    authSystem: 'Sistema de autenticação completo',
    responsiveDesign: 'Design responsivo para mobile e desktop',
    darkLightMode: 'Modo escuro e claro',
    contactManagement: 'Gerenciamento de contatos e conversas',
    modernInterface: 'Interface moderna com animações',
    developedWithLove: 'Desenvolvido com',
    developerMessage: 'Este projeto representa minha paixão pelo desenvolvimento web e meu desejo constante de aprender novas tecnologias e melhores práticas.',
    viewGithub: 'Ver meu GitHub',
    thanksMessage: 'Obrigado por explorar meu projeto! Espero que você goste de usar esta aplicação tanto quanto eu gostei de desenvolvê-la.',
    reactDescription: 'Frontend moderno com hooks e componentes funcionais',
    socketDescription: 'Comunicação em tempo real para chat instantâneo',
    nodeDescription: 'Backend robusto com Express.js',
    mongoDescription: 'Banco de dados NoSQL para armazenamento',

    // Help Page
    helpTitle: 'Central de Ajuda',
    frequentQuestions: 'Perguntas Frequentes',
    contactUs: 'Fale Conosco',
    sendFeedback: 'Enviar Comentários',
    termsConditions: 'Termos e Condições',
    privacyPolicy: 'Política de Privacidade',
    troubleshooting: 'Solução de problemas',
    
    // FAQ
    faqQuestion1: 'Como envio uma mensagem?',
    faqAnswer1: 'Selecione um contato da sua lista e digite sua mensagem na parte inferior da tela.',
    faqQuestion2: 'Como adiciono novos contatos?',
    faqAnswer2: 'Vá para a página principal e clique no botão "+" para buscar e adicionar novos contatos.',
    faqQuestion3: 'Como altero minha foto de perfil?',
    faqAnswer3: 'Vá para seu perfil, clique na sua imagem atual e selecione "Alterar imagem".',
    faqQuestion4: 'Posso usar o aplicativo offline?',
    faqAnswer4: 'Não, você precisa de conexão com a internet para enviar e receber mensagens.',
    
    // Contact
    contactEmail: 'juanfdj73@gmail.com',
    contactSubject: 'Suporte - Chat App',
    contactMessage: 'Olá, preciso de ajuda com...',
    openEmail: 'Abrir email',
    addToContacts: 'Adicionar aos contatos',
    
    // Feedback
    feedbackTitle: 'Enviar comentários',
    feedbackDescription: 'Ajude-nos a melhorar o aplicativo com suas sugestões',
    feedbackPlaceholder: 'Escreva seus comentários aqui...',
    sendFeedbackBtn: 'Enviar comentários',
    feedbackSent: 'Comentários enviados com sucesso',
    
    // Terms & Conditions
    termsTitle: 'Termos e Condições',
    termsContent1: 'Ao usar este aplicativo, você concorda em cumprir com estes termos e condições.',
    termsContent2: 'Este aplicativo é um projeto educacional e pessoal.',
    termsContent3: 'Não nos responsabilizamos pelo mau uso do aplicativo.',
    termsContent4: 'Os dados são armazenados de forma segura e não são compartilhados com terceiros.',
    
    // Troubleshooting
    troubleshootingTitle: 'Solução de problemas',
    problem1: 'As mensagens não estão sendo enviadas',
    solution1: 'Verifique sua conexão com a internet e tente novamente.',
    problem2: 'Não consigo adicionar contatos',
    solution2: 'Certifique-se de digitar corretamente o email do contato.',
    problem3: 'O aplicativo está lento',
    solution3: 'Feche outros aplicativos e verifique sua conexão.',

    // Privacy Policy
    privacyTitle: 'Política de Privacidade',
    privacyContent1: 'Esta aplicação de chat é um projeto educacional e pessoal. Sua privacidade é importante para nós.',
    privacyContent2: 'Coletamos apenas as informações necessárias para o funcionamento do aplicativo: email, nome de usuário e mensagens.',
    privacyContent3: 'Os dados são armazenados de forma segura e criptografada. Não compartilhamos suas informações pessoais com terceiros.',
    privacyContent4: 'Você tem o direito de solicitar a exclusão de seus dados a qualquer momento entrando em contato com o desenvolvedor.',
    privacyContent5: 'As mensagens são armazenadas temporariamente para permitir sincronização entre dispositivos.',
    privacyContent6: 'Utilizamos autenticação segura através do Firebase para proteger sua conta.',
    privacyContent7: 'Não utilizamos cookies de rastreamento nem analisamos seu comportamento para fins publicitários.',
    privacyContent8: 'Ao usar esta aplicação, você concorda com o tratamento de seus dados de acordo com esta política de privacidade.',
    
    // Privacy Sections
    dataCollection: 'Informações que coletamos',
    dataSecurity: 'Segurança de dados',
    authentication: 'Autenticação',
    messageStorage: 'Armazenamento de mensagens',
    noTracking: 'Sem rastreamento',
    userRights: 'Seus direitos',
    problem4: 'Se os problemas persistirem',
    solution4: 'Certifique-se de comunicar-se com o suporte técnico.'
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [isLoading, setIsLoading] = useState(false);

  // Cargar idioma guardado
  useEffect(() => {
    const savedLanguage = localStorage.getItem('chatapp-language');
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Función para cambiar idioma
  const changeLanguage = async (newLanguage) => {
    if (translations[newLanguage]) {
      setIsLoading(true);
      
      // Simular un pequeño delay para mostrar loading
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setCurrentLanguage(newLanguage);
      localStorage.setItem('chatapp-language', newLanguage);
      setIsLoading(false);
    }
  };

  // Función para obtener texto traducido
  const t = (key) => {
    return translations[currentLanguage]?.[key] || key;
  };

  // Obtener información del idioma
  const getLanguageInfo = (langCode) => {
    const languageNames = {
      es: { name: translations[langCode].spanish, flag: '🇪🇸', nativeName: 'Español' },
      en: { name: translations[langCode].english, flag: '🇺🇸', nativeName: 'English' },
      fr: { name: translations[langCode].french, flag: '🇫🇷', nativeName: 'Français' },
      pt: { name: translations[langCode].portuguese, flag: '🇧🇷', nativeName: 'Português' }
    };
    return languageNames[langCode];
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    getLanguageInfo,
    isLoading,
    availableLanguages: Object.keys(translations)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
