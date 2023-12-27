import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function VideoCallRoom() {
  const { roomId } = useParams();

  const myMeeeting = async (element) => {
    const appID = 396523969;
    const serverSecret = "1e4c3309945d982d00fb4677a109a86e";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Rerealise"
    );

    const zc=ZegoUIKitPrebuilt.create(kitToken)
    zc.joinRoom({
        container:element,
        sharedLinks:[{
            name:'Copy Link',
            url: `http://localhost:3000/provider-videocall/${roomId}`

        }],
        scenario:{
            mode:ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton:false
    })
  };

  return <div>
    <div ref={myMeeeting} />
  </div>;
}

export default VideoCallRoom;