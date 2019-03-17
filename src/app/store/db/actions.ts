import { Action, Dispatch } from 'redux';

import { db } from '../../firebase';
import FluxAction from '../FluxAction';

export type channelsType = {
  channelId: string,
  channelName: string,
};

export const dbActionTypes = {
  getAllChannels: 'GET_ALL_CHANNELS',
};

export const getAllChannels = () => (dispatch: Dispatch<Action>) => {
  return new Promise((resolve, reject) => {
    db.collection('channels')
      .get()
      .then((res) => {
        let documents: channelsType[] = [];

        res.forEach(doc => {
          const document = doc.data();
          documents = documents.concat(
            { channelId: document.channelId, channelName: document.channelId },
          );
        });

        dispatch(FluxAction.createPlaneSuccess(
          dbActionTypes.getAllChannels,
          { channels: documents },
        ));
        resolve(documents);
      })
      .catch(err => reject(err));
  });
};
