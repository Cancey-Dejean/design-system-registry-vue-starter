#!/usr/bin/env bun

import { join, relative } from "node:path";
import process from "node:process";

import { file as bunFile, Glob } from "bun";

import {
  getRegistryDiagnostics,
  getRegistryDoctorExitCode,
  type RegistryDiagnostic,
  type RegistryDiagnostics,
} from "./lib/diagnostics";

const registryRoot = join(process.cwd(), "registry");

const files = await readRegistryFiles(registryRoot);
const registryDiagnostics = getRegistryDiagnostics({ files });

printRegistryDiagnostics(registryDiagnostics);

process.exitCode = getRegistryDoctorExitCode(registryDiagnostics);

async function readRegistryFiles(root: string): Promise<Record<string, string>> {
  const entries: [string, string][] = [];

  for await (const path of new Glob("**/*").scan({
    absolute: true,
    cwd: root,
    onlyFiles: true,
  })) {
    entries.push([toRegistryPath(path), await bunFile(path).text()]);
  }

  return Object.fromEntries(entries);
}

function toRegistryPath(path: string): string {
  return relative(process.cwd(), path).replace(/\\/gu, "/");
}

function printRegistryDiagnostics(result: RegistryDiagnostics): void {
  if (result.errors.length === 0 && result.warnings.length === 0) {
    console.log("Registry doctor passed.");
    return;
  }

  printDiagnosticGroup("Errors", result.errors);
  printDiagnosticGroup("Warnings", result.warnings);
}

function printDiagnosticGroup(title: string, findings: readonly RegistryDiagnostic[]): void {
  if (findings.length === 0) {
    return;
  }

  console.log(`${title}:`);

  for (const diagnostic of findings) {
    console.log(`- ${diagnostic.path}: ${diagnostic.message}`);
  }
}
