import { initializeApp, getApps, cert } from "firebase-admin/app";
import { environment } from "configs/environment";

const firebaseAdminConfig = {
  credential: cert({
    projectId: environment.firebase.projectId,
    privateKey: environment.firebase.adminPrivateKey,
    clientEmail: environment.firebase.clientEmail,
  }),
};

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}
