import { useState } from "react";
import RegenerationMonstre from "./RegenerationMonstre";

export default function Scene() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="flex flex-col items-center gap-4">
      <button className="btn btn-sm" onClick={() => setVisible(!visible)}>
        {visible ? "🙈 Cacher le monstre" : "👁️ Faire apparaître le monstre"}
      </button>
      {visible && <RegenerationMonstre />}
      <p className="text-xs opacity-60 max-w-xs text-center">
        Ouvre la console du navigateur : si les logs de régénération
        continuent après avoir caché le monstre, le cleanup est manquant.
      </p>
    </div>
  );
}
