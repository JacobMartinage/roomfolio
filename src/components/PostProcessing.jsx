import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { WebGLRenderTarget, Vector2 } from "three";

const PostProcessing = ({ outlinePassRef }) => {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef(null);

  useEffect(() => {
    if (!gl) return;

    // ✅ Restore correct color space
    gl.outputEncoding = THREE.sRGBEncoding;
    gl.toneMapping = THREE.NoToneMapping; // Disable unwanted color changes

    // ✅ WebGL Renderer with Context Preservation
    const renderTarget = new WebGLRenderTarget(size.width, size.height, {
      samples: gl.getPixelRatio() >= 2 ? 4 : 2,
    });

    const composerInstance = new EffectComposer(gl, renderTarget);
    const renderPass = new RenderPass(scene, camera);
    const outlinePass = new OutlinePass(new Vector2(size.width, size.height), scene, camera);

    // ✅ Restore proper gamma correction
    const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);

    // ✅ Ensure OutlinePass settings don’t change colors
    outlinePass.visibleEdgeColor.set(0xffffff);
    outlinePass.hiddenEdgeColor.set(0x000000);
    outlinePass.edgeStrength = 3;
    outlinePass.edgeGlow = 0.5;
    outlinePass.edgeThickness = 2;

    // Apply Passes
    composerInstance.addPass(renderPass);
    composerInstance.addPass(outlinePass);
    composerInstance.addPass(gammaCorrectionPass); // ✅ Apply gamma correction last

    outlinePassRef.current = outlinePass;
    composer.current = composerInstance;

    return () => {
      composerInstance.dispose();
      renderTarget.dispose();
    };
  }, [gl, scene, camera, size]);

  useEffect(() => {
    const renderLoop = () => {
      if (composer.current) {
        composer.current.render();
      }
      requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => cancelAnimationFrame(renderLoop);
  }, []);

  return null;
};

export default PostProcessing;
