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
    mongoDescription: 'Base de datos NoSQL para almacenamiento'
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
    mongoDescription: 'NoSQL database for storage'
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
    mongoDescription: 'Base de données NoSQL pour le stockage'
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
    mongoDescription: 'Banco de dados NoSQL para armazenamento'
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
