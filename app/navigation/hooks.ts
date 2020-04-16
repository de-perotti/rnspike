import { useEffect } from 'react';
import {
  ComponentDidAppearEvent,
  ComponentDidDisappearEvent,
  ModalAttemptedToDismissEvent,
  ModalDismissedEvent,
  Navigation,
  NavigationButtonPressedEvent,
  PreviewCompletedEvent,
  ScreenPoppedEvent,
  SearchBarCancelPressedEvent,
  SearchBarUpdatedEvent,
} from 'react-native-navigation';

export type EventListeners = {
  // react-native-navigation/lib/src/events/ComponentEventsObserver.ts
  componentDidAppear?: (e: ComponentDidAppearEvent) => void;
  componentDidDisappear?: (e: ComponentDidDisappearEvent) => void;
  navigationButtonPressed?: (e: NavigationButtonPressedEvent) => void;
  modalDismissed?: (e: ModalDismissedEvent) => void;
  modalAttemptedToDismiss?: (e: ModalAttemptedToDismissEvent) => void;
  searchBarUpdated?: (e: SearchBarUpdatedEvent) => void;
  searchBarCancelPressed?: (e: SearchBarCancelPressedEvent) => void;
  previewCompleted?: (e: PreviewCompletedEvent) => void;
  screenPopped?: (e: ScreenPoppedEvent) => void;
};

export function useScreenEvents(
  listeners: EventListeners,
  componentId: string,
) {
  useEffect(() => {
    const listener = Navigation.events().bindComponent(
      listeners as any,
      componentId,
    );

    return () => {
      listener.remove();
    };
  }, [listeners, componentId]);
}
