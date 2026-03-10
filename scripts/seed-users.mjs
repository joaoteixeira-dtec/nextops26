/**
 * Seed script — creates Firebase Auth users + Firestore profiles.
 *
 * Usage:
 *   1. Download your Firebase service account key JSON from:
 *      https://console.firebase.google.com/project/no2026/settings/serviceaccounts/adminsdk
 *   2. Save it as  scripts/serviceAccountKey.json
 *   3. Run:  node scripts/seed-users.mjs
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const keyPath = resolve(__dirname, "serviceAccountKey.json");

let serviceAccount;
try {
  serviceAccount = JSON.parse(readFileSync(keyPath, "utf-8"));
} catch {
  console.error(
    "\n❌  Ficheiro serviceAccountKey.json não encontrado!\n" +
    "   Descarrega-o da consola Firebase:\n" +
    "   https://console.firebase.google.com/project/no2026/settings/serviceaccounts/adminsdk\n" +
    "   e coloca-o em scripts/serviceAccountKey.json\n"
  );
  process.exit(1);
}

const app = initializeApp({ credential: cert(serviceAccount) });
const authAdmin = getAuth(app);
const db = getFirestore(app);

/* ── Users to seed ── */
const USERS = [
  {
    email: "admin@nextopsai.com",
    password: "Admin2026!",
    name: "Admin",
    role: "admin",
    phone: "+351 900 000 001",
  },
  {
    email: "joao@nextopsai.com",
    password: "Joao2026!",
    name: "João Teixeira",
    role: "tecnico",
    phone: "+351 900 000 002",
  },
  {
    email: "luis@nextopsai.com",
    password: "Luis2026!",
    name: "Luís",
    role: "comercial",
    phone: "+351 900 000 003",
  },
];

async function seed() {
  console.log("🚀  A criar utilizadores...\n");

  for (const u of USERS) {
    let uid;

    // 1. Create or get Firebase Auth user
    try {
      const existing = await authAdmin.getUserByEmail(u.email);
      uid = existing.uid;
      console.log(`  ✔ Auth: ${u.email} já existe (uid: ${uid})`);
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        const created = await authAdmin.createUser({
          email: u.email,
          password: u.password,
          displayName: u.name,
        });
        uid = created.uid;
        console.log(`  ✔ Auth: ${u.email} criado (uid: ${uid})`);
      } else {
        throw err;
      }
    }

    // 2. Create Firestore profile in "users" collection
    const profile = {
      email: u.email,
      name: u.name,
      role: u.role,
      phone: u.phone,
      active: true,
      createdAt: new Date().toISOString(),
    };

    await db.collection("users").doc(uid).set(profile, { merge: true });
    console.log(`  ✔ Firestore: perfil ${u.role} criado para ${u.email}\n`);
  }

  console.log("✅  Seed completo! Podes agora fazer login no backoffice.");
  console.log("\n   Credenciais:");
  console.log("   ┌───────────────────────────┬─────────────┬─────────┐");
  console.log("   │ Email                     │ Password    │ Role    │");
  console.log("   ├───────────────────────────┼─────────────┼─────────┤");
  for (const u of USERS) {
    console.log(`   │ ${u.email.padEnd(25)} │ ${u.password.padEnd(11)} │ ${u.role.padEnd(7)} │`);
  }
  console.log("   └───────────────────────────┴─────────────┴─────────┘");
}

seed().catch((err) => {
  console.error("❌  Erro:", err.message);
  process.exit(1);
});
