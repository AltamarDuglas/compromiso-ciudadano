// =============================================================================
// COMPONENTE: LiveSignaturesFeed.jsx
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP).
// Renderiza el muro cívico con animaciones fluidas mediante Framer Motion.
// Sin uso de emojis; utiliza Users y Star de lucide-react.
// =============================================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Star } from 'lucide-react';

export function LiveSignaturesFeed({ pledges = [] }) {
  return (
    <section className="wall-section">
      {/* Encabezado del Muro sin emojis */}
      <div className="wall-header">
        <h2 className="wall-title">
          <Users size={18} className="text-monteria-blue" />
          <span>Voces del Pacto Cívico</span>
        </h2>
        <div className="wall-live-indicator">
          <div className="pulse-dot-green" />
          <span>En vivo</span>
        </div>
      </div>

      {/* Lista animada con Framer Motion */}
      <div className="wall-feed-list">
        <AnimatePresence initial={false}>
          {pledges.map((item) => {
            const initials = item.signer?.getInitials() || "MO";
            const name = item.signer?.fullName || "Monteriano(a)";
            const location = item.signer?.getFormattedLocation() || "Montería";
            const count = item.commitments?.length || 4;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: -15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="wall-card-item"
              >
                <div className="wall-user-info">
                  <div className="wall-avatar">{initials}</div>
                  <div>
                    <div className="wall-name">{name}</div>
                    <div className="wall-loc-time">{location}</div>
                  </div>
                </div>

                <div className="wall-badge-pledges">
                  <Star size={12} fill="currentColor" />
                  <span>{count} acciones</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
