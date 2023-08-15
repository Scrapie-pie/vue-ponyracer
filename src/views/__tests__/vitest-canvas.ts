/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment */
import { vi } from 'vitest';
(global as any).jest = vi;

// @ts-ignore
import getCanvasWindow from 'jest-canvas-mock/lib/window';

const canvasWindow = getCanvasWindow({ document: window.document });
global['CanvasRenderingContext2D'] = canvasWindow['CanvasRenderingContext2D'];
