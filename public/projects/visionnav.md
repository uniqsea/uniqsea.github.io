### System Architecture

VisionNav consists of a mobile app, on-device computer vision, and a wearable haptic device (M5Stack). The phone camera detects obstacles and path cues locally, while Maps data provides route-level guidance. Haptic patterns encode direction and urgency.

### Interaction

- Single-beat: continue forward
- Double-beat left/right: turn guidance
- Long pulse: caution/obstacle detected

### Model

We use a compact YOLOv8 variant for obstacle detection and a lightweight CNN for path position classification, both optimized for real-time inference on-device.

