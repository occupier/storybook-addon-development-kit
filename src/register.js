import React from 'react';
import addons from '@kadira/storybook-addons';
import initStore, { ENQ_ASK } from './store/store';
import initComposer from './store/composer';
import { ADDON_ID, PANEL_ID, ADDON_TITLE } from './';

const defaults = {
    initData: 'Panel',
    defaultData: {},
    api: {},
    render: null,
    ADDON_ID,
    PANEL_ID,
    ADDON_TITLE,
};

export default function (addonSettings) {
    const settings = { ...defaults, ...addonSettings };

    addons.register(settings.ADDON_ID, (api) => {
        const addonStoreCompose = initStore(settings.defaultData, settings.api);
        const PanelContainer = initComposer(addonStoreCompose);
        const getID = () => `pd${Math.round(Math.random() * 100)}`;
        const addonPanel = settings.render(addonStoreCompose);

        addons.addPanel(settings.PANEL_ID, {
            title: settings.ADDON_TITLE,
            render: () => (
              <div>
                <PanelContainer
                  api={api}
                  addonControl={null}
                  initData={settings.initData}
                  rootProps={{ enquiry: ENQ_ASK, ID: getID() }}
                />
                {addonPanel()}
              </div>),
        });
    });
}
