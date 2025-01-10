const Ground = () => {
    return (
        <mesh rotation-x={Math.PI * -0.5} receiveShadow>
          <planeGeometry args={[12.8, 12.8]}/>
          <meshStandardMaterial color={"#c1a559"} />
        </mesh>
    );
};

export default Ground;