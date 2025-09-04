import { create } from "zustand";
import conversationsApi from '../services/api/conversations.js';
import userApi from '../services/api/users.js';

const useConversationsStore = create((set, get) => {
    return {
        // Estado
        conversations: [],
        contactDataCache: new Map(),
        isLoading: false,
        lastFetch: null,
        cacheTimeout: 5 * 60 * 1000, // 5 minutos

        // Función para verificar si el caché es válido
        isCacheValid: () => {
            const { lastFetch, cacheTimeout } = get();
            if (!lastFetch) return false;
            return (Date.now() - lastFetch) < cacheTimeout;
        },

        // Función para enriquecer conversaciones con datos actualizados
        enrichConversationsWithUpdatedData: async (conversations) => {
            const { contactDataCache } = get();
            
            try {
                const enrichedConversations = await Promise.all(
                    conversations.map(async (conv) => {
                        try {
                            const contactUid = conv.contactInfo.uid;

                            // Verificar si ya tenemos datos en cache
                            if (contactDataCache.has(contactUid)) {
                                const cachedData = contactDataCache.get(contactUid);
                                return {
                                    ...conv,
                                    contactInfo: {
                                        ...conv.contactInfo,
                                        displayName: cachedData.displayName || conv.contactInfo.displayName,
                                        photoURL: cachedData.photoURL || conv.contactInfo.photoURL,
                                    }
                                };
                            }

                            // Obtener datos actualizados del contacto desde la BD
                            const contactData = await userApi.getUserByUid(contactUid);

                            // Actualizar cache
                            set(state => ({
                                contactDataCache: new Map(state.contactDataCache.set(contactUid, contactData))
                            }));

                            return {
                                ...conv,
                                contactInfo: {
                                    ...conv.contactInfo,
                                    displayName: contactData.displayName || conv.contactInfo.displayName,
                                    photoURL: contactData.photoURL || conv.contactInfo.photoURL,
                                }
                            };
                        } catch (error) {
                            console.warn(`No se pudieron obtener datos actualizados para ${conv.contactInfo.uid}:`, error);
                            return conv;
                        }
                    })
                );

                return enrichedConversations;
            } catch (error) {
                console.error('Error enriqueciendo conversaciones:', error);
                return conversations;
            }
        },

        // Función para cargar conversaciones
        loadConversations: async (userLogged, forceRefresh = false) => {
            const { isCacheValid, conversations, enrichConversationsWithUpdatedData } = get();

            // Si tenemos cache válido y no es refresh forzado, usar cache
            if (!forceRefresh && isCacheValid() && conversations.length > 0) {
                console.log('Usando conversaciones desde cache');
                return conversations;
            }

            set({ isLoading: true });

            try {
                console.log('Cargando conversaciones desde API...');
                const data = await conversationsApi.getUserConversations(userLogged);
                console.log("Conversations fetched:", data);

                const enrichedConversations = await enrichConversationsWithUpdatedData(data);
                console.log("Conversations enriched:", enrichedConversations);

                set({ 
                    conversations: enrichedConversations,
                    isLoading: false,
                    lastFetch: Date.now()
                });

                return enrichedConversations;
            } catch (error) {
                console.error("Error al obtener conversaciones:", error);
                set({ isLoading: false });
                return [];
            }
        },

        // Función para actualizar una conversación específica
        updateConversation: (conversationId, updates) => {
            set(state => ({
                conversations: state.conversations.map(conv => 
                    conv._id === conversationId 
                        ? { ...conv, ...updates }
                        : conv
                )
            }));
        },

        // Función para agregar una nueva conversación
        addConversation: (newConversation) => {
            set(state => ({
                conversations: [newConversation, ...state.conversations]
            }));
        },

        // Función para actualizar el último mensaje de una conversación
        updateLastMessage: (conversationId, messageData) => {
            set(state => ({
                conversations: state.conversations.map(conv => 
                    conv._id === conversationId 
                        ? { 
                            ...conv, 
                            lastMessage: {
                                content: messageData.content,
                                isFromCurrentUser: messageData.isFromCurrentUser,
                                timestamp: messageData.timestamp
                            }
                        }
                        : conv
                )
            }));
        },

        // Función para limpiar el cache
        clearCache: () => {
            set({
                conversations: [],
                contactDataCache: new Map(),
                lastFetch: null,
                isLoading: false
            });
        },

        // Función para invalidar cache (forzar recarga en próxima petición)
        invalidateCache: () => {
            set({ lastFetch: null });
        }
    };
});

export default useConversationsStore;
