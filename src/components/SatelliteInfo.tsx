import { connect, NatsConnection } from "nats.ws";
import { useEffect, useState } from "react";

const SatelliteInfo = () => {
  const [nats, setNats] = useState<NatsConnection | null>(null);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    const natsConnect = async () => {
      if (nats) return;
      try {
        const nc = await connect({ servers: "ws://localhost:8080" });
        setNats(nc);
        console.log("nats connected");
        const sub = nc.subscribe("satellite_01.telemetry");
        console.log("subscribed to satellite_01.telemetry");
        for await (const msg of sub) {
          setMsg(msg.string());
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    natsConnect();

    return () => {
      nats?.drain();
      console.log("nats connection closed");
    };
  }, []);

  return <div>{msg}</div>;
};

export default SatelliteInfo;
