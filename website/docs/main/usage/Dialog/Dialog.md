import Snack from './snack/index.md'

<Snack />

> **Web-platform specific note**:
>
> You **must** pass a valid React Native [`Modal`](https://reactnative.dev/docs/modal) component implementation
> into [`ModalComponent`](#modalcomponent) prop because `Modal` component is not implemented yet in `react-native-web`

```jsx
...
import Modal from 'modal-react-native-web';

...

<Dialog ModalComponent={Modal} ... />
...
```
