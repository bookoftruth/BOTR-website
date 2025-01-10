const Lights = () => {
    return (
        <>
            <ambientLight intensity={1} />
            <directionalLight
                position={[-2.5, 7.5, 2.5]}
                castShadow
                shadow-mapSize-height={1000}
                shadow-mapSize-width={1000}
                shadow-camera-left={-20}
                shadow-camera-right={20}
                shadow-camera-top={20}
                shadow-camera-bottom={-20}
            />
            <hemisphereLight args={["#7cdbe6", "#5e9c49", 0.7]}/>
        </>
    );
};

export default Lights;