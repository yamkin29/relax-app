import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type Tab = 'videos' | 'channels';

interface AppState {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
}

export const useStore = create<AppState>()(
    devtools(
        persist(
            (set) => ({
                activeTab: 'videos',
                setActiveTab: (tab) => set({ activeTab: tab }),
            }),
            {
                name: 'app-storage',
                partialize: (state) => ({ activeTab: state.activeTab }),
            }
        ),
        {
            name: 'app-store',
        }
    )
); 