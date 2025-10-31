"use client";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/reducers.store";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}
export function StoreProvider(props: Props) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {props.children}
        </PersistGate>
      </Provider>
    </>
  );
}
