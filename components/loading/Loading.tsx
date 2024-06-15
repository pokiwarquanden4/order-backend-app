import { Animated, View } from "react-native";
import { usePromiseTracker } from "react-promise-tracker";
import Spinner from 'react-native-loading-spinner-overlay';

export const Loading = () => {
    const { promiseInProgress } = usePromiseTracker();

    return <Spinner
        visible={promiseInProgress}
    />
}