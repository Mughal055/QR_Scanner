import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
    Linking,
    Vibration,
} from 'react-native';
import Header from '../component/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
// Vision Camera V5 APIs
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { useBarcodeScannerOutput } from 'react-native-vision-camera-barcode-scanner';

// IMPORTANT: formats array component ke bahar rakhein (har render par naya array na bane)
const BARCODE_FORMATS = ['all-formats']; // sirf QR chahiye to: ['qr-code']

const QrContact = () => {
    const cameraRef = useRef(null);

    // 1. Permissions
    const { hasPermission, requestPermission } = useCameraPermission();
    const [permissionChecked, setPermissionChecked] = useState(false);

    // 2. Control states
    const [cameraPosition, setCameraPosition] = useState('back');
    const [flashMode, setFlashMode] = useState('off'); // Torch DEFAULT OFF
    const [isCameraActive, setIsCameraActive] = useState(true);
    const [zoomValue, setZoomValue] = useState(1);
    const [isStarted, setIsStarted] = useState(false); // session start hone ke baad hi zoom/torch apply

    // 3. Scan result states
    const [scannedValue, setScannedValue] = useState(null);
    const scanLockRef = useRef(false); // ek QR bar bar fire na ho

    // 4. Device
    const device = useCameraDevice(cameraPosition);

    useEffect(() => {
        (async () => {
            if (!hasPermission) {
                await requestPermission();
            }
            setPermissionChecked(true);
        })();
    }, [hasPermission]);

    // Torch na ho (front camera) to off
    useEffect(() => {
        if (device && !device.hasTorch) {
            setFlashMode('off');
        }
    }, [device]);

    // ---------------- Barcode Scanning ----------------
    const handleScan = (barcodes) => {
        if (scanLockRef.current) return;
        if (!barcodes || barcodes.length === 0) return;

        const first = barcodes[0];
        const value = first.rawValue ?? first.displayValue;
        if (!value) return;

        scanLockRef.current = true; // lock: result close hone tak dobara scan nahi
       
        setScannedValue(value);

        // TODO: yahan SQLite history mein save karein:
        // addHistory('scan', value);
    };

    // Latest handler ref mein rakhte hain taake stale closure na ho
    const handleScanRef = useRef(handleScan);
    handleScanRef.current = handleScan;

    const barcodeOutput = useBarcodeScannerOutput({
        barcodeFormats: BARCODE_FORMATS,
        onBarcodeScanned: (barcodes) => handleScanRef.current(barcodes),
        onError: (error) => console.log('Barcode scanner error:', error),
    });

    const outputs = useMemo(() => [barcodeOutput], [barcodeOutput]);

    const scanAgain = () => {
        setScannedValue(null);
        scanLockRef.current = false;
    };

    const isUrl = (text) => /^https?:\/\//i.test(text || '');

    const openLink = async () => {
        try {
            await Linking.openURL(scannedValue);
        } catch (e) {
            Alert.alert('Error', 'Link open nahi ho saka.');
        }
    };

    // ---------------- Controls ----------------
    const minZoom = Math.max(1, device?.minZoom ?? 1);
    const maxZoom = Math.min(6, device?.maxZoom ?? 6);

    const toggleFlash = () => {
        if (!isCameraActive) {
            Alert.alert('Camera Stopped', 'Torch chalane ke liye pehle camera start karein.');
            return;
        }
        if (device && device.hasTorch) {
            setFlashMode((prev) => (prev === 'off' ? 'on' : 'off'));
        } else {
            Alert.alert('Hardware Notice', 'Torch/Flash light is not supported on this device/camera side.');
        }
    };

    const toggleCameraPosition = () => {
        setCameraPosition((prev) => (prev === 'back' ? 'front' : 'back'));
        setFlashMode('off');
        setZoomValue(1);
        setIsStarted(false);
    };

    const toggleCameraActiveState = () => {
        if (isCameraActive) setFlashMode('off');
        setIsCameraActive(!isCameraActive);
    };

    const adjustZoom = (type) => {
        setZoomValue((prev) => {
            let nextZoom = type === 'in' ? prev + 0.5 : prev - 0.5;
            if (nextZoom < minZoom) nextZoom = minZoom;
            if (nextZoom > maxZoom) nextZoom = maxZoom;
            return nextZoom;
        });
    };

    if (!permissionChecked || !device) {
        return (
            <SafeAreaView style={styles.fallbackContainer}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={styles.loadingText}>Initializing Scanner Hardware...</Text>
            </SafeAreaView>
        );
    }

    if (!hasPermission) {
        return (
            <SafeAreaView style={styles.fallbackContainer}>
                <Text style={styles.loadingText}>Camera permission required</Text>
                <TouchableOpacity style={styles.primaryButton} onPress={requestPermission}>
                    <Text style={styles.primaryButtonText}>Grant Permission</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const zoomPercent = maxZoom > minZoom ? ((zoomValue - minZoom) / (maxZoom - minZoom)) * 100 : 0;
    const thumbPercent = maxZoom > minZoom ? ((zoomValue - minZoom) / (maxZoom - minZoom)) * 88 : 0;

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header title={'QR SCANNING'} />

            {/* Camera Viewport */}
            <View style={styles.viewportOutline}>
                {isCameraActive ? (
                    <>
                        <Camera
                            ref={cameraRef}
                            style={StyleSheet.absoluteFill}
                            device={device}
                            isActive={isCameraActive}
                            outputs={outputs}
                            torchMode={isStarted && device.hasTorch ? flashMode : 'off'}
                            zoom={isStarted ? zoomValue : undefined}
                            onStarted={() => setIsStarted(true)}
                            onStopped={() => setIsStarted(false)}
                            onError={(e) => console.log('Camera error:', e)}
                        />
                        {/* Scan frame corners */}
                        <View pointerEvents="none" style={styles.scanFrame} />
                    </>
                ) : (
                    <View style={[StyleSheet.absoluteFill, styles.frozenOverlay]}>
                        <Text style={styles.frozenText}>Camera Stopped</Text>
                    </View>
                )}
            </View>

            {/* Scan Result Card */}
            {scannedValue ? (
                <View style={styles.resultCard}>
                    <Text style={styles.resultTitle}>Scanned Result</Text>
                    <Text style={styles.resultValue} numberOfLines={4} selectable>
                        {scannedValue}
                    </Text>
                    <View style={styles.resultButtonsRow}>
                        {isUrl(scannedValue) && (
                            <TouchableOpacity style={styles.secondaryButton} onPress={openLink}>
                                <Text style={styles.secondaryButtonText}>Open Link</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={styles.primaryButton} onPress={scanAgain}>
                            <Text style={styles.primaryButtonText}>Scan Again</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <Text style={styles.hintText}>Put the Barcode in Frame.</Text>
            )}

            {/* Controls */}
            <View style={styles.controlRowContainer}>
                <View style={styles.controlUnit}>
                    <TouchableOpacity
                        style={[styles.actionIconButton, flashMode === 'on' && styles.activeStateTint]}
                        onPress={toggleFlash}
                    >
                        <Text style={styles.iconSymbolText}>{flashMode === 'on' ? '⚡' : '✖️'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.indicatorLabel}>{flashMode === 'on' ? 'On' : 'Off'}</Text>
                </View>

                <View style={styles.controlUnit}>
                    <TouchableOpacity style={styles.actionIconButton} onPress={toggleCameraPosition}>
                        <Text style={styles.iconSymbolText}>🔄</Text>
                    </TouchableOpacity>
                    <Text style={styles.indicatorLabel}>{cameraPosition === 'back' ? 'Back' : 'Front'}</Text>
                </View>

                <View style={styles.controlUnit}>
                    <TouchableOpacity
                        style={[styles.actionIconButton, !isCameraActive && styles.stoppedStateTint]}
                        onPress={toggleCameraActiveState}
                    >
                        <Text style={styles.iconSymbolText}>{isCameraActive ? '⏹️' : '▶️'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.indicatorLabel}>{isCameraActive ? 'Stop' : 'Start'}</Text>
                </View>
            </View>

            {/* Zoom */}
            <View style={styles.customZoomContainer}>
                <TouchableOpacity style={styles.zoomStepButton} onPress={() => adjustZoom('out')}>
                    <Text style={styles.zoomStepText}>➖</Text>
                </TouchableOpacity>

                <View style={styles.customSliderTrack}>
                    <View style={[styles.customSliderProgress, { width: `${zoomPercent}%` }]} />
                    <View style={[styles.customSliderThumb, { left: `${thumbPercent}%` }]}>
                        <Text style={styles.thumbText}>{zoomValue.toFixed(1)}x</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.zoomStepButton} onPress={() => adjustZoom('in')}>
                    <Text style={styles.zoomStepText}>➕</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: '#fff' },
    fallbackContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 12, fontSize: 15, color: '#666' },
    viewportOutline: {
        width: '85%',
        aspectRatio: 1,
        alignSelf: 'center',
        marginTop: 30,
        backgroundColor: '#000',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    scanFrame: {
        position: 'absolute',
        top: '15%',
        left: '15%',
        right: '15%',
        bottom: '15%',
        borderWidth: 2,
        borderColor: '#ffe600',
        borderRadius: 10,
    },
    frozenOverlay: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#1c1c1e' },
    frozenText: { color: '#ff3b30', fontSize: 16, fontWeight: '600' },
    hintText: { textAlign: 'center', marginTop: 18, fontSize: 14, color: '#666' },
    resultCard: {
        width: '85%',
        alignSelf: 'center',
        marginTop: 18,
        padding: 14,
        borderRadius: 12,
        backgroundColor: '#f2f2f7',
    },
    resultTitle: { fontSize: 13, color: '#666', marginBottom: 6, fontWeight: '600' },
    resultValue: { fontSize: 15, color: '#000', marginBottom: 12 },
    resultButtonsRow: { flexDirection: 'row', justifyContent: 'flex-end' },
    primaryButton: {
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 10,
        marginTop: 10,
    },
    primaryButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
    secondaryButton: {
        backgroundColor: '#ffe600',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 10,
        marginRight: 10,
        marginTop: 10,
    },
    secondaryButtonText: { color: '#000', fontWeight: '600', fontSize: 14 },
    controlRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 25,
        paddingHorizontal: 20,
    },
    controlUnit: { alignItems: 'center' },
    actionIconButton: {
        width: 68,
        height: 68,
        borderRadius: 16,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    activeStateTint: { backgroundColor: '#ffe600' },
    stoppedStateTint: { backgroundColor: '#ffcc00' },
    iconSymbolText: { fontSize: 22 },
    indicatorLabel: { marginTop: 8, fontSize: 14, color: '#333', fontWeight: '500' },
    customZoomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '85%',
        alignSelf: 'center',
        marginTop: 25,
        paddingHorizontal: 5,
    },
    zoomStepButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f2f2f7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoomStepText: { fontSize: 14 },
    customSliderTrack: {
        flex: 1,
        height: 6,
        backgroundColor: '#e5e5ea',
        borderRadius: 3,
        marginHorizontal: 15,
        position: 'relative',
        justifyContent: 'center',
    },
    customSliderProgress: {
        height: '100%',
        backgroundColor: '#000',
        borderRadius: 3,
        position: 'absolute',
        left: 0,
    },
    customSliderThumb: {
        width: 34,
        height: 22,
        borderRadius: 6,
        backgroundColor: '#000',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    thumbText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
});

export default QrContact;