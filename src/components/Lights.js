const Lights = () => {
    return (
        <>
            <ambientLight intensity={1} />
            <directionalLight
                position={[-1.25, 3.75, 1.25]}
                intensity={3}
                castShadow
                shadow-mapSize-height={1000}
                shadow-mapSize-width={1000}
                shadow-camera-left={-20}
                shadow-camera-right={20}
                shadow-camera-top={20}
                shadow-camera-bottom={-20}
            />
        </>
    );
};

export default Lights;