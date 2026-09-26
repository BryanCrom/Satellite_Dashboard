import { connect, NatsConnection } from "nats.ws";
import { useEffect, useState } from "react";

const Home = () => {
  const [nats, setNats] = useState<NatsConnection | null>(null);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    const natsConnect = async () => {
      if (nats) return;
      try {
        console.log("trey");
        const nc = await connect({ servers: "localhost:4222" });
        setNats(nc);
        console.log("nats connected");
        const sub = nc.subscribe("satellite_01.telemetry");
        console.log("subscribed to satellite_01.telemetry");
        for await (const msg of sub) {
          setMsg(msg.string());
          break;
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

  return <div>hello {msg}</div>;
};

export default Home;
