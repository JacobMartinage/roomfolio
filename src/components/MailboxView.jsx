import { useThree } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";
import { Html } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import emailjs from "@emailjs/browser";

const MailboxView = ({ isActive, onClose, controlsRef }) => {
  const { camera } = useThree();
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(isActive);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (isActive) {
      setShouldAnimate(true);
    }
  }, [isActive]);

  // Store the initial camera position & rotation
  const [initialCamera] = useState({
    position: new THREE.Vector3(20, 10, 20),
    quaternion: new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        -69.35 * Math.PI / 180,
        6.5 * Math.PI / 180,
        11.5 * Math.PI / 180
      )
    ),
  });

  // Target position for mailbox view
  const targetPosition = shouldAnimate ? new THREE.Vector3(7.5, 5, -0.8) : initialCamera.position;
  const targetQuaternion = shouldAnimate
    ? new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0))
    : initialCamera.quaternion;

  // Camera transition animation
  const { pos, rot } = useSpring({
    pos: targetPosition.toArray(),
    rot: [targetQuaternion.x, targetQuaternion.y, targetQuaternion.z, targetQuaternion.w],
    config: { mass: 1, tension: 180, friction: 40, clamp: true },
    onStart: () => setIsAnimating(true),
    onChange: ({ value }) => {
      camera.position.set(...value.pos);
      const newQuat = new THREE.Quaternion(value.rot[0], value.rot[1], value.rot[2], value.rot[3]);
      camera.quaternion.slerp(newQuat, 0.1);
      camera.updateProjectionMatrix();
    },
    onRest: () => {
      setIsAnimating(false);
      if (!shouldAnimate && controlsRef.current) {
        controlsRef.current.enabled = true;
      }
    },
  });

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = !shouldAnimate;
    }
  }, [shouldAnimate, controlsRef]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const closeAndReset = () => {
    // First close the form
    onClose();
    // Then start camera movement
    setTimeout(() => {
      setShouldAnimate(false);
    }, 50);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_2vxcnum",
        "template_srn9ref",
        {
          from_name: form.name,
          to_name: "Jacob",
          from_email: form.email,
          to_email: "me@jacobmartinage.com",
          message: form.message,
        },
        "YkNmtMMqXxvYoOTBV"
      )
      .then(() => {
        setLoading(false);
        alert("Thank you! I will get back to you as soon as possible.");
        setForm({ name: "", email: "", message: "" });
        closeAndReset();
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        alert("Something went wrong. Please try again later.");
      });
  };

  return isActive ? (
    <group>
      <Html 
      position={[6.98, 5.7, -2.3]} 
      center
      zIndexRange={[3,3]}
      occlude = "blending"
      >
        <div
          style={{
            background: "#fdf8e1",
            borderRadius: "10px",
            padding: "20px",
            width: "600px",
            height: "400px",
            position: "absolute",

            fontFamily: "'Courier New', Courier, monospace",
          }}
        >
          {/* Stamp */}
          <img
            src="/images/stamp.jpg"
            alt="Stamp"
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              width: "50px",
              height: "50px",
              transform: "rotate(-5deg)", // Slight angle for authenticity
              opacity: "0.85",
              border: "2px solid black",
              borderRadius: "5px",
            }}
          />

          {/* Close Button */}
          <button
            onClick={closeAndReset}
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              fontWeight: "bold",
              color: "black",
            }}
          >
            ✕
          </button>

          <h3 style={{ textAlign: "center", marginBottom: "10px", color: "black" }}>📬 Send Me a Message</h3>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <label style={{ fontSize: "14px", color: "black" }}>Your Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "2px solid black",
                background: "#fffaf0",
                color: "black",
                fontFamily: "inherit",
              }}
            />
            <label style={{ fontSize: "14px", color: "black" }}>Your Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "2px solid black",
                background: "#fffaf0",
                color: "black",
                fontFamily: "inherit",
              }}
            />
            <label style={{ fontSize: "14px", color: "black" }}>Your Message:</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows="5"
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "2px solid black",
                background: "#fffaf0",
                color: "black",
                fontFamily: "inherit",
                resize: "vertical",
              }}
            />
            <button
              type="submit"
              style={{
                background: "#000",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </Html>
    </group>
  ) : null;
};

export default MailboxView;
