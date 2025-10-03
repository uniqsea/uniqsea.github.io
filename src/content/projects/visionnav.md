## Overview
 VisionNav transforms smartphone camera input and Google Maps data into clear haptic guidance. Designed for people with visual/hearing impairments and for noisy or visually demanding environments, it provides reliable, safe, and accessible navigation using simple, understandable feedback.
## Features

- Turn-by-turn navigation enhanced with vibration cues;
- Obstacle detection and avoidance using YOLOv8-based vision models;
- Path position recognition via a lightweight CNN classifier;
- Mobile UI for destination search, route view, and QR code sharing;

## System Architecture

VisionNav consists of a mobile app, on-device computer vision, and a wearable haptic device (M5Stack). The phone camera detects obstacles and path cues locally, while Maps data provides route-level guidance. Haptic patterns encode direction and urgency.

## Interaction

- Single-beat: continue forward
- Double-beat left/right: turn guidance
- Long pulse: caution/obstacle detected

## Model

We use a compact YOLOv8 variant for obstacle detection and a lightweight CNN for path position classification, both optimized for real-time inference on-device.

