"use client";

import { useState, useEffect } from "react";

// Types (à adapter selon tes modèles réels)
interface SpeakerLink {
  id?: string; // optionnel, présent uniquement après sauvegarde
  platform: string;
  url: string;
}

interface Speaker {
  id: string;
  fullName: string;
  bio: string;
  photoUrl: string;
  links: SpeakerLink[];
  _count?: {
    sessions: number;
  };
}

export default function AdminSpeakersPage() {
  const API_URL = "http://localhost:3001/api";

  // Liste des intervenants
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // État du formulaire (ajout/modification)
  const [isEditing, setIsEditing] = useState(false); // false = ajout, true = modification
  const [editingId, setEditingId] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [links, setLinks] = useState<SpeakerLink[]>([]);

  // Récupération de la liste
  const fetchSpeakers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/speakers`);
      if (!res.ok) throw new Error("Erreur lors du chargement");
      const json = await res.json();
      setSpeakers(json.data ?? []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

  // Réinitialiser le formulaire
  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setFullName("");
    setBio("");
    setPhotoUrl("");
    setLinks([]);
  };

  // Ouvrir le formulaire pour ajouter un speaker
  const handleAddNew = () => {
    resetForm();
    // le formulaire est prêt pour l'ajout
  };

  // Ouvrir le formulaire pour modifier un speaker existant
  const handleEdit = (speaker: Speaker) => {
    setIsEditing(true);
    setEditingId(speaker.id);
    setFullName(speaker.fullName);
    setBio(speaker.bio);
    setPhotoUrl(speaker.photoUrl ?? "");
    // On ne garde que les champs nécessaires pour le formulaire
    setLinks(
      speaker.links.map((l) => ({
        id: l.id,
        platform: l.platform,
        url: l.url,
      }))
    );
  };

  // Gestion dynamique des liens
  const addLink = () => {
    setLinks([...links, { platform: "", url: "" }]);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (
    index: number,
    field: "platform" | "url",
    value: string
  ) => {
    const updated = [...links];
    updated[index][field] = value;
    setLinks(updated);
  };

  // Soumission du formulaire (création ou mise à jour)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      fullName,
      bio,
      photoUrl,
      links: links.map((l) => ({ platform: l.platform, url: l.url })),
      // Si besoin d'autres champs (ex: eventId), à adapter
    };

    try {
      const url = isEditing
        ? `${API_URL}/speakers/${editingId}`
        : `${API_URL}/speakers`;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erreur lors de l'enregistrement");

      // Rafraîchir la liste et fermer le formulaire
      await fetchSpeakers();
      resetForm();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Suppression d'un speaker
  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet intervenant ?")) return;
    try {
      const res = await fetch(`${API_URL}/speakers/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      await fetchSpeakers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p className="p-6">Chargement...</p>;
  if (error) return <p className="p-6 text-red-600">Erreur : {error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-black">Gestion des intervenants</h1>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Ajouter un intervenant
        </button>
      </div>

      {/* Liste des intervenants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {speakers.map((speaker) => (
          <div
            key={speaker.id}
            className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm"
          >
            <div className="flex items-center gap-4">
              {speaker.photoUrl ? (
                <img
                  src={speaker.photoUrl}
                  alt={speaker.fullName}
                  className="w-16 h-16 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  ?
                </div>
              )}
              <div>
                <h2 className="font-semibold text-lg">{speaker.fullName}</h2>
                {speaker._count?.sessions !== undefined && (
                  <p className="text-sm text-gray-500">
                    {speaker._count.sessions} session(s)
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(speaker)}
                className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(speaker.id)}
                className="text-sm bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Formulaire (toujours visible si on clique sur Ajouter/Modifier) */}
      {(fullName !== "" || isEditing || fullName === "" && !isEditing) ? null : null}
      {/* Affichage conditionnel du formulaire en bas, ou en modal */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? "Modifier l'intervenant" : "Nouvel intervenant"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          {/* Nom complet */}
          <div>
            <label className="block text-sm font-medium mb-1">Nom complet</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Biographie */}
          <div>
            <label className="block text-sm font-medium mb-1">Biographie</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Photo (URL) */}
          <div>
            <label className="block text-sm font-medium mb-1">URL de la photo</label>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="https://..."
            />
            {/* Aperçu conforme à la spec */}
            {photoUrl && (
              <img
                src={photoUrl}
                alt="Aperçu"
                className="w-20 h-20 rounded-full object-cover mt-3 border"
              />
            )}
          </div>

          {/* Liens dynamiques */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Liens (réseaux sociaux, site…)
            </label>
            {links.map((link, index) => (
              <div key={index} className="flex gap-2 items-center mb-2">
                <input
                  type="text"
                  placeholder="Plateforme (ex: linkedin)"
                  value={link.platform}
                  onChange={(e) => updateLink(index, "platform", e.target.value)}
                  className="flex-1 border rounded-lg px-3 py-1"
                />
                <input
                  type="url"
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => updateLink(index, "url", e.target.value)}
                  className="flex-1 border rounded-lg px-3 py-1"
                />
                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  className="text-red-500 hover:text-red-700 text-xl leading-none px-2"
                  title="Supprimer ce lien"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addLink}
              className="text-sm text-blue-600 hover:underline mt-1"
            >
              + Ajouter un lien
            </button>
          </div>

          {/* Boutons de formulaire */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              {isEditing ? "Enregistrer les modifications" : "Créer l'intervenant"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-200"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}