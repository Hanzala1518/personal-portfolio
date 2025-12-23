export interface ModelMeta {
  name: string
  version: string
  accuracy?: number
  updatedAt: string
  description: string
  framework: "TensorFlow.js" | "ONNX" | "FastAPI"
}
