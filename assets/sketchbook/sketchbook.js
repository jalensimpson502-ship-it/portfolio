(() => {
  const mount = document.getElementById("sketchbookGrid");
  if (!mount) return;
  const sketchbookItems = [
    {
      title: "Engine Assembly Study",
      category: "Mechanical Design",
      type: "video",
      media: "assets/sketchbook/videos/engine-explode.mp4",
      description: "Exploded assembly study used to explore component relationships and mechanical packaging.",
      tags: ["CAD", "Assembly"],
      fit: "contain",
      size: "wide"
    },
    {
      title: "Bracket FEA Study",
      category: "Structural Analysis",
      type: "image",
      media: "assets/sketchbook/images/fea-bracket.png",
      description: "Finite-element analysis used to evaluate stress behavior and structural response.",
      tags: ["FEA", "Simulation"],
      fit: "contain",
      size: "normal"
    },
    {
      title: "Quick-Release Components",
      category: "Mechanical Design",
      type: "image",
      media: "assets/sketchbook/images/quick-release.png",
      description: "Component layout and print preparation for a compact quick-release mechanism.",
      tags: ["CAD", "Mechanisms"],
      fit: "contain",
      size: "normal"
    },
    {
      title: "Prototype Iterations",
      category: "Digital Fabrication",
      type: "image",
      media: "assets/sketchbook/images/prototype-iterations.png",
      description: "Multiple physical iterations used to compare geometry, fit, and manufacturability.",
      tags: ["3D Printing", "Iteration"],
      fit: "contain",
      size: "wide"
    },
    {
      title: "Mold Design Study",
      category: "CAD & Tooling",
      type: "image",
      media: "assets/sketchbook/images/cad-mold.png",
      description: "A smaller CAD exercise focused on tooling geometry and part-to-mold relationships.",
      tags: ["CAD", "Tooling"],
      fit: "contain",
      size: "normal"
    },
    {
      title: "Exploded Mechanical Assembly",
      category: "Mechanical Design",
      type: "image",
      media: "assets/sketchbook/images/exploded-assembly.png",
      description: "Exploded-view communication of a multi-component mechanical assembly.",
      tags: ["Assembly", "Design"],
      fit: "contain",
      size: "normal"
    },
    {
      title: "F1 Wing Prototype",
      category: "Prototype Fabrication",
      type: "image",
      media: "assets/sketchbook/images/f1-wing.jpg",
      description: "Large-format physical prototype assembled from multiple fabricated sections. Potential to add active aerodynamic features in future iterations.",
      tags: ["3D Printing", "Prototype"],
      fit: "cover",
      size: "normal"
    },
    {
      title: "Arc Reactor Print",
      category: "Digital Fabrication",
      type: "video",
      media: "assets/sketchbook/videos/arc-reactor-print.mp4",
      description: "Short fabrication-process clip from an additive-manufacturing build.",
      tags: ["3D Printing", "Fabrication"],
      fit: "cover",
      size: "normal"
    },
    {
      title: "Wearable Faceplate Prototype",
      category: "Wearable Design",
      type: "image",
      media: "assets/sketchbook/images/faceplate.jpg",
      description: "Printed wearable component used to explore fit, geometry, and physical integration.",
      tags: ["Wearables", "Prototype"],
      fit: "cover",
      size: "normal"
    },
    {
      title: "Bell Mechanism Assembly",
      category: "Mechanical Design",
      type: "image",
      media: "assets/sketchbook/images/bell-assembly.png",
      description: "A compact mechanism and mounting study modeled as part of smaller design work.",
      tags: ["CAD", "Mechanisms"],
      fit: "contain",
      size: "normal"
    }
  ];

  const createTags = (tags) => {
    const row = document.createElement("div");
    row.className = "tag-row";
    tags.forEach((tag) => {
      const span = document.createElement("span");
      span.textContent = tag;
      row.appendChild(span);
    });
    return row;
  };

  sketchbookItems.forEach((item) => {
    const card = document.createElement("article");
    card.className = `sketchbook-media-card${item.size === "wide" ? " is-wide" : ""}`;

    const mediaWrap = document.createElement("div");
    mediaWrap.className = `sketchbook-media${item.fit === "contain" ? " is-contain" : ""}`;

    let media;
    if (item.type === "video") {
      media = document.createElement("video");
      media.src = item.media;
      media.muted = true;
      media.loop = true;
      media.playsInline = true;
      media.preload = "metadata";
      media.setAttribute("aria-label", item.title);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        media.autoplay = true;
        media.play().catch(() => {});
      } else {
        media.controls = true;
      }
    } else {
      media = document.createElement("img");
      media.src = item.media;
      media.alt = item.title;
      media.loading = "lazy";
      media.decoding = "async";
    }

    mediaWrap.appendChild(media);

    const copy = document.createElement("div");
    copy.className = "sketchbook-media-copy";

    const kicker = document.createElement("p");
    kicker.className = "project-kicker";
    kicker.textContent = item.category;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.description;

    copy.append(kicker, title, description, createTags(item.tags));
    card.append(mediaWrap, copy);
    mount.appendChild(card);
  });
})();
