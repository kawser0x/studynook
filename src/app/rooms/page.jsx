
const RoomsPage = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms`)
    const rooms = await res.json()

    console.log(rooms)
    return (
        <div>
          Rooms
        </div>
    );
};

export default RoomsPage;