export const formatMessageDate = (messageDate, t, currentLanguage = 'es') => {
    const now = new Date();
    const msgDate = new Date(messageDate);
    
    // Resetear horas para comparar solo fechas
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const msgDateOnly = new Date(msgDate.getFullYear(), msgDate.getMonth(), msgDate.getDate());
    
    // Diferencia en días
    const diffTime = today.getTime() - msgDateOnly.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return t('today');
    } else if (diffDays === 1) {
        return t('yesterday');
    } else if (diffDays <= 7) {
        // Días de la semana
        const days = [t('sunday'), t('monday'), t('tuesday'), t('wednesday'), t('thursday'), t('friday'), t('saturday')];
        return days[msgDate.getDay()];
    } else {
        // Más de una semana: formato según el idioma
        const day = msgDate.getDate().toString().padStart(2, '0');
        const month = (msgDate.getMonth() + 1).toString().padStart(2, '0');
        const year = msgDate.getFullYear();
        
        // Formato según idioma
        switch (currentLanguage) {
            case 'en':
                return `${month}/${day}/${year}`;
            case 'fr':
                return `${day}/${month}/${year}`;
            case 'pt':
                return `${day}/${month}/${year}`;
            default: // español
                return `${day}/${month}/${year}`;
        }
    }
};

export const isSameDay = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
};

// Nueva función para agrupar mensajes por día
export const groupMessagesByDay = (messages) => {
    if (!messages || !Array.isArray(messages)) {
        return [];
    }

    const groupedMessages = [];
    let currentDay = null;
    
    messages.forEach((message, index) => {
        const messageDate = new Date(message.timestamp);
        const messageDateOnly = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());
        
        // Si es un día diferente al anterior, agregar separador
        if (!currentDay || currentDay.getTime() !== messageDateOnly.getTime()) {
            currentDay = messageDateOnly;
            groupedMessages.push({
                type: 'dateSeparator',
                date: message.timestamp,
                id: `separator-${messageDateOnly.getTime()}`
            });
        }
        
        // Agregar el mensaje con type 'message'
        groupedMessages.push({
            ...message,
            type: 'message'
        });
    });
    
    return groupedMessages;
};