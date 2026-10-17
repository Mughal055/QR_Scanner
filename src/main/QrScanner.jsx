import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';

import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  usePhotoOutput,
} from 'react-native-vision-camera';

import Header from '../component/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import Slider from '@react-native-community/slider';

import {
  useBarcodeScannerOutput,
} from 'react-native-vision-camera-barcode-scanner';

import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';

import { addScan } from '../Database/Models';
import { useMMKVBoolean } from 'react-native-mmkv';

const BARCODE_FORMATES = ['qr-code'];

const QrScanner = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  // DARK MODE
  const [dark] = useMMKVBoolean('darkTheme');

  const colors = {
    background: dark ? '#121212' : '#FFFFFF',
    card: dark ? '#1E1E1E' : '#FFFFFF',
    text: dark ? '#FFFFFF' : '#000000',
    icon: dark ? '#FFFFFF' : '#000000',
    border: dark ? '#383838' : '#E5E5E5',
    slider: dark ? '#FFFFFF' : '#000000',
    track: dark ? '#555555' : '#3D3B3B',
  };

  // SCANNER LOCK
  const Lock = useRef(false);

  useFocusEffect(
    useCallback(() => {
      Lock.current = false;
    }, [])
  );

  // CAMERA OUTPUT
  const photoOutput = usePhotoOutput();

  // STATES
  const [Flash, setFlash] = useState(false);
  const [Front, setFront] = useState(false);
  const [Stop, setStop] = useState(true);
  const [scale, setScale] = useState(1);
  const [isStarted, setIsStarted] = useState(false);

  // CAMERA DEVICE
  const device = useCameraDevice(Front ? 'front' : 'back');

  const {
    hasPermission,
    requestPermission,
  } = useCameraPermission();

  // BARCODE SCANNER
  const codeScanner = useBarcodeScannerOutput({
    barcodeFormats: BARCODE_FORMATES,

    onBarcodeScanned: async (barcodes) => {
      if (Lock.current) return;

      if (barcodes.length > 0) {
        Lock.current = true;

        const ScannedRawValue = barcodes[0].rawValue;
        console.log(ScannedRawValue);

        const createdAt = new Date().toISOString();

        try {
          await addScan(ScannedRawValue, createdAt);
        } catch (error) {
          console.log(error);
        }

        // CAPTURE PHOTO
        let photoPath = null;

        try {
          const photo = await photoOutput.capturePhotoToFile({}, {});
          photoPath = photo.filePath;
          console.log('Pathhh', photoPath);
        } catch (error) {
          console.log(error);
        }

        // NAVIGATION
        navigation.navigate('ScanDone', {
          item: {
            content: ScannedRawValue,
            created_at: createdAt,
            image: photoPath,
          },
        });
      }
    },
  });

  // CAMERA OUTPUTS
  const output = useMemo(
    () =>
      codeScanner && photoOutput
        ? [codeScanner, photoOutput]
        : [],
    [codeScanner, photoOutput]
  );

  // CAMERA PERMISSION
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Header title="QR SCANNING" />

      {/* CAMERA PREVIEW */}
      <View style={styles.cameraContainer}>
        {hasPermission && device && (
          <Camera
            device={device}
            isActive={Stop && isFocused}
            style={StyleSheet.absoluteFill}
            zoom={isStarted ? scale : undefined}
            torchMode={
              isStarted && device.hasTorch
                ? Flash
                  ? 'on'
                  : 'off'
                : undefined
            }
            onStarted={() => {
              setIsStarted(true);
              console.log('Camera started');
            }}
            onError={(e) =>
              console.log('Camera error:', e?.message)
            }
            onStopped={() => setIsStarted(false)}
            outputs={output}
          />
        )}
      </View>

      {/* FLASH, FRONT/BACK AND STOP/START BUTTONS */}
      <View style={styles.buttonsContainer}>

        {/* FLASH BUTTON */}
        <View style={styles.control}>
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => setFlash(!Flash)}
              disabled={!device?.hasTorch}
            >
              <Ionicons
                name={Flash ? 'flash' : 'flash-off'}
                size={25}
                color={colors.icon}
              />
            </TouchableOpacity>
          </View>

          <Text style={[styles.text, { color: colors.text }]}>
            {Flash ? 'On' : 'Off'}
          </Text>
        </View>

        {/* FRONT/BACK CAMERA BUTTON */}
        <View style={styles.control}>
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                setFront(!Front);
                setFlash(false);
                setIsStarted(false);
              }}
            >
              <Ionicons
                name={Front ? 'camera' : 'camera-reverse'}
                size={25}
                color={colors.icon}
              />
            </TouchableOpacity>
          </View>

          <Text style={[styles.text, { color: colors.text }]}>
            {Front ? 'Back' : 'Front'}
          </Text>
        </View>

        {/* STOP/START BUTTON */}
        <View style={styles.control}>
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <TouchableOpacity onPress={() => setStop(!Stop)}>
              <Ionicons
                name={Stop ? 'stop' : 'play'}
                size={25}
                color={colors.icon}
              />
            </TouchableOpacity>
          </View>

          <Text style={[styles.text, { color: colors.text }]}>
            {Stop ? 'Stop' : 'Start'}
          </Text>
        </View>
      </View>

      {/* ZOOM SLIDER */}
      <View
        style={[
          styles.zoom,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Slider
          value={scale}
          onValueChange={setScale}
          minimumValue={device?.minZoom ?? 1}
          maximumValue={device?.maxZoom ?? 5}
          minimumTrackTintColor={colors.slider}
          thumbTintColor={colors.slider}
          maximumTrackTintColor={colors.track}
        />
      </View>

      <Text style={[styles.zoomTitle, { color: colors.text }]}>
        Zoom Scale
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    alignSelf: 'center',
    marginTop: 50,
    overflow: 'hidden',
    borderRadius: 8,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 60,
  },

  control: {
    alignItems: 'center',
  },

  card: {
    width: 64,
    height: 64,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  text: {
    marginTop: 8,
    fontSize: 14,
  },

  zoom: {
    width: '76%',
    height: 55,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    elevation: 7,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginVertical: 20,
  },

  zoomTitle: {
    fontSize: 15,
    letterSpacing: 2,
    textAlign: 'center',
  },
});

export default QrScanner;
