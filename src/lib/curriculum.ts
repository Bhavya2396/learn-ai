// Adapted curriculum data from education-platform-frontend-release1
// Maps topics to their HTML content in public/FinalContent/

export interface CurriculumSubtopic {
  id: string;
  name: string;
  contentPath: string;
}

export interface CurriculumTopic {
  id: string;
  name: string;
  contentPath?: string;
  pdfPath?: string;
  subtopics?: CurriculumSubtopic[];
}

export interface CurriculumChapter {
  id: string;
  name: string;
  icon: string;
  color: string;
  topics: CurriculumTopic[];
}

export interface CurriculumSubject {
  id: string;
  name: string;
  icon: string;
  color: string;
  chapters: CurriculumChapter[];
}

export type ClassCurriculum = Record<string, CurriculumSubject[]>;

// Comprehensive curriculum data structure based on FinalContent folder

export const curriculum: ClassCurriculum = {
  '9th': [
    {
      id: 'Science',
    name: 'Science', 
    icon: "🔬",
    color: '#F59E0B',

    chapters: [
      {
          id: 'Physics',
        name: 'Physics',
        icon: "⚡",
        color: '#F59E0B',
        topics: [
            {
              id: 'Motion',
              name: 'Motion',

              contentPath: '/FinalContent/Class 9th/Science/Physics/Motion/index.html',
              pdfPath: '/FinalContent/Class 9th/Science/Physics/Motion/Motion.pdf',
              subtopics: [
                {
                  id: '7.1_motion',
                  name: 'Motion',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Motion/7.1_motion.html',

                },
                {
                  id: '7.2_measuring-the-rate-of-motion',
                  name: 'Measuring the Rate of Motion',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Motion/7.2_measuring-the-rate-of-motion.html',

                },
                {
                  id: '7.3_Rate-of-Change-of-Velocity',
                  name: 'Rate of Change of Velocity',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Motion/7.3_Rate-of-Change-of-Velocity.html',

                },
                {
                  id: '7.4_Graphical-representation-of-motion',
                  name: 'Graphical Representation of Motion',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Motion/7.4_Graphical-representation-of-motion.html',

                },
                {
                  id: '7.5_equations-of-motion',
                  name: 'Equations of Motion',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Motion/7.5_equations-of-motion.html',

                },
                {
                  id: 'uniform-circular-motion-interactive',
                  name: 'Uniform Circular Motion (Interactive)',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Motion/uniform-circular-motion-interactive(need-changes).html',

                }
              ]
            },
            {
              id: 'Force and Laws of Motion',
              name: 'Force and Laws of Motion',

              contentPath: '/FinalContent/Class 9th/Science/Physics/Force and Laws of Motion/index.html',
              pdfPath: '/FinalContent/Class 9th/Science/Physics/Force and Laws of Motion/Force and laws of motion.pdf',
              subtopics: [
                {
                  id: '8.1_balanced_and_unbalanced_forces',
                  name: 'Balanced and Unbalanced Forces',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Force and Laws of Motion/8.1_balanced_and_unbalanced_forces.html',

                },
                {
                  id: '8.2_First_law_of_motion',
                  name: 'First Law of Motion',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Force and Laws of Motion/8.2_First_law_of_motion.html',

                },
                {
                  id: '8.3_inertia_and_mass',
                  name: 'Inertia and Mass',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Force and Laws of Motion/8.3_inertia_and_mass.html',

                },
                {
                  id: '8.4_second_law_of_motion',
                  name: 'Second Law of Motion',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Force and Laws of Motion/8.4_second_law_of_motion.html',

                },
                {
                  id: '8.4.1_derivation_2nd_law_of_motion',
                  name: 'Derivation of Second Law of Motion',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Force and Laws of Motion/8.4.1_derivation_2nd_law_of_motion.html',

                },
                {
                  id: '8.5_third_law_of_motion',
                  name: 'Third Law of Motion',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Force and Laws of Motion/8.5_third_law_of_motion.html',

                }
              ]
            },
            {
              id: 'Gravitation',
              name: 'Gravitation',

              contentPath: '/FinalContent/Class 9th/Science/Physics/Gravitation/index.html',
              pdfPath: '/FinalContent/Class 9th/Science/Physics/Gravitation/Gravitation.pdf',
              subtopics: [
                {
                  id: '9.1_Gravitation',
                  name: 'Gravitation',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Gravitation/9.1_Gravitation.html',

                },
                {
                  id: '9.2_freefall',
                  name: 'Free Fall',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Gravitation/9.2_freefall.html',

                },
                {
                  id: '9.3_Mass_9.4_Weight',
                  name: 'Mass and Weight',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Gravitation/9.3_Mass_9.4_Weight.html',

                },
                {
                  id: '9.5_Thrust_and_Pressure',
                  name: 'Thrust and Pressure',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Gravitation/9.5_Thrust_and_Pressure.html',

                },
                {
                  id: '9.6_Archimedes_Principle',
                  name: 'Archimedes Principle',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Gravitation/9.6_Archimedes_Principle.html',

                }
              ]
            },
            {
              id: 'Work and Energy',
              name: 'Work and Energy',

              contentPath: '/FinalContent/Class 9th/Science/Physics/Work and Energy/index.html',
              pdfPath: '/FinalContent/Class 9th/Science/Physics/Work and Energy/Work and Energy.pdf',
              subtopics: [
                {
                  id: '10.1_work',
                  name: 'Work',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Work and Energy/10.1_work.html',

                },
                {
                  id: '10.2_energy',
                  name: 'Energy',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Work and Energy/10.2_energy.html',

                },
                {
                  id: '10.3_Rate_of_Doing_Work',
                  name: 'Rate of Doing Work',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Work and Energy/10.3_Rate_of_Doing_Work.html',

      }
    ]
  },
  { 
              id: 'Sound',
              name: 'Sound',

              contentPath: '/FinalContent/Class 9th/Science/Physics/Sound/index.html',
              pdfPath: '/FinalContent/Class 9th/Science/Physics/Sound/Sound.pdf',
              subtopics: [
                {
                  id: '11.1_Production_of_Sound',
                  name: 'Production of Sound',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Sound/11.1_Production_of_Sound.html',

                },
                {
                  id: '11.2_PROPOGATION_OF_SOUND',
                  name: 'Propagation of Sound',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Sound/11.2_PROPOGATION_OF_SOUND.html',

                },
                {
                  id: '11.3_Reflection_of_SOUND',
                  name: 'Reflection of Sound',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Sound/11.3_Reflection_of_SOUND.html',

                },
                {
                  id: '11.4_Range_of_Hearing',
                  name: 'Range of Hearing',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Sound/11.4_Range_of_Hearing.html',

                },
                {
                  id: '11.5_Applications_of_UltraSound',
                  name: 'Applications of Ultrasound',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Sound/11.5_Applications_of_UltraSound.html',

                }
              ]
            }
          ]
        },
        {
          id: 'Chemistry',
        name: 'Chemistry',
        icon: "🧪",
        color: '#F59E0B',
        topics: [
            {
              id: 'Matter In Our Surroundings',
              name: 'Matter In Our Surroundings',

              contentPath: '/FinalContent/Class 9th/Science/Chemistry/Matter In Our Surroundings/index.html',
              pdfPath: '/FinalContent/Class 9th/Science/Chemistry/Matter In Our Surroundings/Matter in our Surroundings.pdf',
              subtopics: [
                {
                  id: '1_Physical_Nature_of_Matter',
                  name: 'Physical Nature of Matter',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Matter In Our Surroundings/1_Physical Nature of Matter.html',

                },
                {
                  id: '2_Characteristics_of_Particles_of_Matter',
                  name: 'Characteristics of Particles of Matter',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Matter In Our Surroundings/2_Characteristics of Particles of Matter.html',

                },
                {
                  id: '3_states_of_matter_fixed',
                  name: 'States of Matter',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Matter In Our Surroundings/3_states_of_matter_fixed (1).html',

                },
                {
                  id: '4_Can_Matter_Change_its_State',
                  name: 'Can Matter Change its State?',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Matter In Our Surroundings/4_Can Matter Change its State_.html',

                },
                {
                  id: '5_evaporation',
                  name: 'Evaporation',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Matter In Our Surroundings/5_evaporation.html',

                }
              ]
            },
            {
              id: 'IS MATTER AROUND US PURE_',
              name: 'Is Matter Around Us Pure?',

              contentPath: '/FinalContent/Class 9th/Science/Chemistry/IS MATTER AROUND US PURE_/index.html',
              pdfPath: '/FinalContent/Class 9th/Science/Chemistry/IS MATTER AROUND US PURE_/IS MATTER AROUND US PURE_.pdf',
              subtopics: [
                {
                  id: 'mixtures-interactive',
                  name: 'Mixtures (Interactive)',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/IS MATTER AROUND US PURE_/mixtures-interactive (3).html',

      }
    ]
  },
  { 
              id: 'ATOMS AND MOLECULES',
              name: 'Atoms and Molecules',

              contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/index.html',
              pdfPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/Atoms and Molecules.pdf',
              subtopics: [
                {
                  id: '3.1_Laws_of_Chemical_Combination',
                  name: 'Laws of Chemical Combination',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.1 Laws of Chemical Combination.html',

                },
                {
                  id: '3.1.2_Law_of_Constant_Proportions',
                  name: 'Law of Constant Proportions',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.1.2 Law of Constant Proportions.html',

                },
                {
                  id: '3.2_What_is_an_Atom',
                  name: 'What is an Atom',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.2 What is an Atom.html',

                },
                {
                  id: '3.2.1_Modern_Symbols_of_Atoms',
                  name: 'Modern Symbols of Atoms',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.2.1 Modern Symbols of Atoms.html',

                },
                {
                  id: '3.3_What_is_a_Molecule',
                  name: 'What is a Molecule',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.3 What is a Molecule.html',

                },
                {
                  id: '3.4_Writing_Chemical_Formulae',
                  name: 'Writing Chemical Formulae',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.4 Writing Chemical Formulae .html',

                },
                {
                  id: '3.5_Molecular_Mass',
                  name: 'Molecular Mass',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.5 Molecular Mass .html',

                }
              ]
            },
            {
              id: 'Structure of an atom',
              name: 'Structure of the Atom',

              contentPath: '/FinalContent/Class 9th/Science/Chemistry/Structure of an atom/index.html',
              pdfPath: '/FinalContent/Class 9th/Science/Chemistry/Structure of an atom/Structure of the atom.pdf',
              subtopics: [
                {
                  id: '4.1_charged_particles',
                  name: 'Charged Particles',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Structure of an atom/4.1_charged_particles.html',

                },
                {
                  id: '4.2_atomic_models',
                  name: 'Atomic Models',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Structure of an atom/4.2_atomic_models.html',

                },
                {
                  id: '4.3_electron_distribution',
                  name: 'Electron Distribution',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Structure of an atom/4.3_electron_distribution.html',

                },
                {
                  id: '4.4_valency',
                  name: 'Valency',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Structure of an atom/4.4_valency.html',

                },
                {
                  id: '4.5_atomic_number_mass',
                  name: 'Atomic Number and Mass',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Structure of an atom/4.5_atomic_number_mass.html',

                },
                {
                  id: '4.6_isotopes_isobars',
                  name: 'Isotopes and Isobars',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Structure of an atom/4.6_isotopes_isobars.html',

                }
              ]
            }
          ]
        },
        {
          id: 'Biology',
        name: 'Biology',
        icon: "🧬",
        color: '#F59E0B',
        topics: [
            {
              id: 'Fundamental Unit of Life',
              name: 'Cell—The Fundamental Unit of Life',

              contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/index.html',
              pdfPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/The fundamental unit of life.pdf',
              subtopics: [
                {
                  id: 'human-heart-intro',
                  name: 'Human Heart Overview',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/Human Heart.html',

                },
                {
                  id: 'cell_discovery_interactive',
                  name: 'Cell Discovery (Interactive)',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/cell_discovery_interactive.html',

                },
                {
                  id: 'cell_division_exhibit',
                  name: 'Cell Division Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/cell_division_exhibit.html',

                },
                {
                  id: 'cell_membrane_transport',
                  name: 'Cell Membrane Transport',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/cell_membrane_transport.html',

                },
                {
                  id: 'cell_wall_plasmolysis',
                  name: 'Cell Wall and Plasmolysis',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/cell_wall_plasmolysis.html',

                },
                {
                  id: 'energy_organelles_exhibit',
                  name: 'Energy Organelles Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/energy_organelles_exhibit.html',

                },
                {
                  id: 'nucleus_genetic_exhibit',
                  name: 'Nucleus and Genetic Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/nucleus_genetic_exhibit.html',

                },
                {
                  id: 'organelle_systems_exhibit',
                  name: 'Organelle Systems Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/organelle_systems_exhibit.html',

                }
              ]
            },
            {
              id: 'Tissues',
              name: 'Tissues',

              contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/index.html',
              pdfPath: '/FinalContent/Class 9th/Science/Biology/Tissues/Tissues.pdf',
              subtopics: [
                {
                  id: 'complex_tissues_protection',
                  name: 'Complex Tissues Protection',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/complex_tissues_protection.html',

                },
                {
                  id: 'epithelial_connective_tissues',
                  name: 'Epithelial and Connective Tissues',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/epithelial_connective_tissues.html',

                },
                {
                  id: 'muscular_tissues_interactive',
                  name: 'Muscular Tissues (Interactive)',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/muscular_tissues_interactive.html',

                },
                {
                  id: 'nervous_tissue_interactive',
                  name: 'Nervous Tissue (Interactive)',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/nervous_tissue_interactive.html',

                },
                {
                  id: 'plant_tissues_exhibit',
                  name: 'Plant Tissues Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/plant_tissues_exhibit.html',

                },
                {
                  id: 'simple_permanent_tissues',
                  name: 'Simple Permanent Tissues',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/simple_permanent_tissues.html',

                }
              ]
            },
            {
              id: 'Improvement in Food Resources',
              name: 'Improvement in Food Resources',

              contentPath: '/FinalContent/Class 9th/Science/Biology/Improvement in Food Resources/index.html',
              pdfPath: '/FinalContent/Class 9th/Science/Biology/Improvement in Food Resources/Improvement in food resources.pdf',
              subtopics: [
                {
                  id: 'animal_husbandry_exhibit',
                  name: 'Animal Husbandry Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Improvement in Food Resources/animal_husbandry_exhibit.html',

                },
                {
                  id: 'crop_breeding_exhibit',
                  name: 'Crop Breeding Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Improvement in Food Resources/crop_breeding_exhibit.html',

                },
                {
                  id: 'fisheries_beekeeping_exhibit',
                  name: 'Fisheries and Beekeeping Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Improvement in Food Resources/fisheries_beekeeping_exhibit.html',

                },
                {
                  id: 'food_security_exhibit',
                  name: 'Food Security Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Improvement in Food Resources/food_security_exhibit.html',

                },
                {
                  id: 'irrigation_protection_exhibit',
                  name: 'Irrigation and Protection Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Improvement in Food Resources/irrigation_protection_exhibit.html',

                },
                {
                  id: 'nutrient_soil_exhibit',
                  name: 'Nutrient and Soil Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Improvement in Food Resources/nutrient_soil_exhibit.html',

                }
              ]
            }
        ]
      }
    ]
  },
  { 
      id: 'English',
    name: 'English', 
    icon: "📖",
    color: '#8B5CF6',

    chapters: [
      {
          id: 'Beehive – Main textbook (prose and poetry)',
          name: 'Beehive – Main textbook (prose and poetry)',
        icon: "📝",
        color: '#8B5CF6',
        topics: [
            {
              id: 'The Fun they Had',
              name: 'The Fun they Had',

              contentPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/The Fun they Had/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/The Fun they Had/The fun they had.pdf'
            },
            {
              id: 'The Sound of Music',
              name: 'The Sound of Music',

              contentPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/The Sound of Music/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/The Sound of Music/The sound of music.pdf'
            },
            {
              id: 'The little girl',
              name: 'The Little Girl',

              contentPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/The little girl/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/The little girl/The little girl.pdf'
            },
            {
              id: 'A Truly Beautiful mind',
              name: 'A Truly Beautiful Mind',

              contentPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/A Truly Beautiful mind/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/A Truly Beautiful mind/A truely beautiful mind.pdf'
            },
            {
              id: 'The Snake and the Mirror',
              name: 'The Snake and the Mirror',

              contentPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/The Snake and the Mirror/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/The Snake and the Mirror/The snake and the mirror.pdf'
            },
            {
              id: 'My Childhood',
              name: 'My Childhood',

              contentPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/My Childhood/my-childhood-lesson/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/My Childhood/My childhood.pdf'
            },
            {
              id: 'Reach for the Top',
              name: 'Reach for the Top',

              contentPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/Reach for the Top/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/Reach for the Top/Reach for the top.pdf'
            },
            {
              id: 'Kathmandu',
              name: 'Kathmandu',

              contentPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/Kathmandu/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/Kathmandu/Kathmandu.pdf'
            },
            {
              id: 'If I were you',
              name: 'If I Were You',

              contentPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/If I were you/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/If I were you/If I were you.pdf'
            }
          ]
        },
        {
          id: 'Moments – Supplementary reader (short stories)',
          name: 'Moments – Supplementary reader (short stories)',
        icon: "📕",
        color: '#8B5CF6',
          topics: [
            {
              id: 'The Lost Child',
              name: 'The Lost Child',

              contentPath: '/FinalContent/Class 9th/English/Moments – Supplementary reader (short stories)/The Lost Child/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Moments – Supplementary reader (short stories)/The Lost Child/The Lost Child.pdf'
            },
            {
              id: 'The Adventures of Toto',
              name: 'The Adventures of Toto',

              contentPath: '/FinalContent/Class 9th/English/Moments – Supplementary reader (short stories)/The Adventures of Toto/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Moments – Supplementary reader (short stories)/The Adventures of Toto/The Adventures of Toto.pdf'
            },
            {
              id: 'Iswaran the Storyteller',
              name: 'Iswaran the Storyteller',

              contentPath: '/FinalContent/Class 9th/English/Moments – Supplementary reader (short stories)/Iswaran the Storyteller/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Moments – Supplementary reader (short stories)/Iswaran the Storyteller/Iswaran the Storyteller.pdf'
            },
            {
              id: 'In the Kingdom of Fools',
              name: 'In the Kingdom of Fools',

              contentPath: '/FinalContent/Class 9th/English/Moments – Supplementary reader (short stories)/In the Kingdom of Fools/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Moments – Supplementary reader (short stories)/In the Kingdom of Fools/In the Kingdom of Fools.pdf'
            },
            {
              id: 'The Happy Prince',
              name: 'The Happy Prince',

              contentPath: '/FinalContent/Class 9th/English/Moments – Supplementary reader (short stories)/The Happy Prince/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Moments – Supplementary reader (short stories)/The Happy Prince/The Happy Prince.pdf'
            },
            {
              id: 'Weathering the Storm in Ersama',
              name: 'Weathering the Storm in Ersama',

              contentPath: '/FinalContent/Class 9th/English/Moments – Supplementary reader (short stories)/Weathering the Storm in Ersama/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Moments – Supplementary reader (short stories)/Weathering the Storm in Ersama/Weathering the Storm in Ersama.pdf'
            },
            {
              id: 'The Last Leaf',
              name: 'The Last Leaf',

              contentPath: '/FinalContent/Class 9th/English/Moments – Supplementary reader (short stories)/The Last Leaf/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Moments – Supplementary reader (short stories)/The Last Leaf/The Last Leaf.pdf'
            },
            {
              id: 'A House is not a Home',
              name: 'A House is not a Home',

              contentPath: '/FinalContent/Class 9th/English/Moments – Supplementary reader (short stories)/A House is not a Home/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Moments – Supplementary reader (short stories)/A House is not a Home/A House is not a Home.pdf'
            },
            {
              id: 'The Beggar',
              name: 'The Beggar',

              contentPath: '/FinalContent/Class 9th/English/Moments – Supplementary reader (short stories)/The Beggar/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Moments – Supplementary reader (short stories)/The Beggar/The Beggar.pdf'
            }
          ]
        },
        {
          id: 'Words and Expressions',
          name: 'Words and Expressions',
          icon: "📕",
          color: '#8B5CF6',
          topics: [
            {
              id: 'A Truly Beautiful Mind',
              name: 'A Truly Beautiful Mind',

              contentPath: '/FinalContent/Class 9th/English/Words and Expressions/A truly Beautiful Mind/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Words and Expressions/A truly Beautiful Mind/A truly Beautiful Mind.pdf'
            },
            {
              id: 'If I Were You',
              name: 'If I Were You',

              contentPath: '/FinalContent/Class 9th/English/Words and Expressions/If I Were You/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Words and Expressions/If I Were You/If I Were You.pdf'
            },
            {
              id: 'Kathmandu',
              name: 'Kathmandu',

              contentPath: '/FinalContent/Class 9th/English/Words and Expressions/Kathmandu/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Words and Expressions/Kathmandu/Kathmandu.pdf'
            },
            {
              id: 'My Childhood',
              name: 'My Childhood',

              contentPath: '/FinalContent/Class 9th/English/Words and Expressions/My childhood/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Words and Expressions/My childhood/My Childhood.pdf'
            },
            {
              id: 'Reach for the Top',
              name: 'Reach for the Top',

              contentPath: '/FinalContent/Class 9th/English/Words and Expressions/Reach for the Top/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Words and Expressions/Reach for the Top/Reach for the Top.pdf'
            },
            {
              id: 'The Fun they Had',
              name: 'The Fun they Had',

              contentPath: '/FinalContent/Class 9th/English/Words and Expressions/The fun they Had/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Words and Expressions/The fun they Had/The Fun they had.pdf'
            },
            {
              id: 'The Little Girl',
              name: 'The Little Girl',

              contentPath: '/FinalContent/Class 9th/English/Words and Expressions/The Little Girl/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Words and Expressions/The Little Girl/The little girl.pdf'
            },
            {
              id: 'The Snake and the Mirror',
              name: 'The Snake and the Mirror',

              contentPath: '/FinalContent/Class 9th/English/Words and Expressions/The Snake and the Mirror/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Words and Expressions/The Snake and the Mirror/The snake and the mirror.pdf'
            },
            {
              id: 'The Sound of Music',
              name: 'The Sound of Music',

              contentPath: '/FinalContent/Class 9th/English/Words and Expressions/The Sound of Music/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Words and Expressions/The Sound of Music/The Sound of Music.pdf'
            }
        ]

        }
      ]
    },
    {
      id: 'Social Science',
    name: 'Social Science', 
    icon: "🌍",
    color: '#EF4444',

    chapters: [
      {
          id: 'Democratic Politics',
          name: 'Democratic Politics',
          icon: "👥",
          color: '#EF4444',
        topics: [
            {
              id: 'What is Democracy Why Democracy',
              name: 'What is Democracy? Why Democracy?',

              contentPath: '/FinalContent/Class 9th/Social Science/Democratic Politics/What is Democracy Why Democracy/index.html',
              pdfPath: '/FinalContent/Class 9th/Social Science/Democratic Politics/What is Democracy Why Democracy/What is democracy why democracy.pdf'
            },
            {
              id: 'Constitutional Design',
              name: 'Constitutional Design',

              contentPath: '/FinalContent/Class 9th/Social Science/Democratic Politics/Constitutional Design/index.html',
              pdfPath: '/FinalContent/Class 9th/Social Science/Democratic Politics/Constitutional Design/Costitutional Design.pdf'
            },
            {
              id: 'Electoral Politics',
              name: 'Electoral Politics',

              contentPath: '/FinalContent/Class 9th/Social Science/Democratic Politics/Electoral Politics/index.html',
              pdfPath: '/FinalContent/Class 9th/Social Science/Democratic Politics/Electoral Politics/Electoral Politics.pdf'
            },
            {
              id: 'Working of Institutions',
              name: 'Working of Institutions',

              contentPath: '/FinalContent/Class 9th/Social Science/Democratic Politics/Working of Institutions/index.html',
              pdfPath: '/FinalContent/Class 9th/Social Science/Democratic Politics/Working of Institutions/Working of Institutions.pdf'
            },
            {
              id: 'Demoratic Rights',
              name: 'Democratic Rights',

              contentPath: '/FinalContent/Class 9th/Social Science/Democratic Politics/Demoratic Rights/index.html',
              pdfPath: '/FinalContent/Class 9th/Social Science/Democratic Politics/Demoratic Rights/Democratic Rights.pdf'
            }
          ]
        },
        {
          id: 'Economics',
          name: 'Economics',
          icon: "💰",
          color: '#EF4444',
        topics: [
            {
              id: 'The Story of Village Palampur',
              name: 'The Story of Village Palampur',

              contentPath: '/FinalContent/Class 9th/Social Science/Economics/The Story of Village Palampur/index.html',
              pdfPath: '/FinalContent/Class 9th/Social Science/Economics/The Story of Village Palampur/The Story of Village Palampur.pdf',

            },
            {
              id: 'People as Resource',
              name: 'People as Resource',

              contentPath: '/FinalContent/Class 9th/Social Science/Economics/People as Resource/index.html',
              pdfPath: '/FinalContent/Class 9th/Social Science/Economics/People as Resource/People as Resource.pdf',

            },
            {
              id: 'Poverty as a Challenge',
              name: 'Poverty as a Challenge',

              contentPath: '/FinalContent/Class 9th/Social Science/Economics/Poverty as a Challenge/index.html',
              pdfPath: '/FinalContent/Class 9th/Social Science/Economics/Poverty as a Challenge/Poverty as a Challenge.pdf',

            },
            {
              id: 'Food Security in India',
              name: 'Food Security in India',

              contentPath: '/FinalContent/Class 9th/Social Science/Economics/Food Security in India/index.html',
              pdfPath: '/FinalContent/Class 9th/Social Science/Economics/Food Security in India/Food Security in India.pdf',

            }
          ]
        },
        {
          id: 'History',
        name: 'History',
        icon: "🏛️",
        color: '#EF4444',
          topics: [
            {
              id: 'French Revolution',
              name: 'French Revolution',

              contentPath: 'https://www.youtube.com/watch?v=YzmihBfspcM',

              pdfPath: '/FinalContent/Class 9th/Social Science/History/The french revolution.pdf',

            },
            {
              id: 'Socialism in Europe and the Russian Revolution',
              name: 'Socialism in Europe and the Russian Revolution',

              contentPath: 'https://www.youtube.com/watch?v=Ux_kZkHao8g',

              pdfPath: '/FinalContent/Class 9th/Social Science/History/Socialism in Europe and the Russian Revolution.pdf',

            },
            {
              id: 'The Making of a Global World',
              name: 'The Making of a Global World',

              contentPath: 'https://www.youtube.com/watch?v=oYQiGozr7d8',

            },
            {
              id: 'Forest Society and Colonialism',
              name: 'Forest Society and Colonialism',

              contentPath: 'https://www.youtube.com/watch?v=PLVWrfzEnr4',

              pdfPath: '/FinalContent/Class 9th/Social Science/History/Forest Society and Colonialism.pdf',

            },
            {
              id: 'Pastoralists in the Modern World',
              name: 'Pastoralists in the Modern World',

              contentPath: 'https://www.youtube.com/watch?v=_Nfs-bJpNJ8',

              pdfPath: '/FinalContent/Class 9th/Social Science/History/Pastoralists in the Modern World.pdf',

            }
        ]
      }
    ]
  },
  { 
      id: 'Hindi',
    name: 'Hindi', 
    icon: "🗣️",
    color: '#06B6D4',

    chapters: [
      {
        id: 'स्पर्श भाग 1',
        name: 'स्पर्श भाग 1',
        icon: "📝",
        color: '#06B6D4',
        topics: [
          {
            id: 'अग्नि पथ',
            name: 'अग्नि पथ',

            contentPath: '/FinalContent/Class 9th/Hindi/स्पर्श भाग 1/अग्नि पथ/index.html',
            pdfPath: '/FinalContent/Class 9th/Hindi/स्पर्श भाग 1/अग्नि पथ/agni path.pdf',

          },
          {
            id: 'नए इलाके में - खुशबू रचते हैं हाथ',
            name: 'नए इलाके में - खुशबू रचते हैं हाथ',

            contentPath: '/FinalContent/Class 9th/Hindi/स्पर्श भाग 1/नए इलाके में - खुशबू रचते हैं हाथ/index.html',
            pdfPath: '/FinalContent/Class 9th/Hindi/स्पर्श भाग 1/नए इलाके में - खुशबू रचते हैं हाथ/naye ilake me.pdf',

          },
          {
            id: 'रहीम के दोहे',
            name: 'रहीम के दोहे',

            contentPath: '/FinalContent/Class 9th/Hindi/स्पर्श भाग 1/रहीम के दोहे/index.html',
            pdfPath: '/FinalContent/Class 9th/Hindi/स्पर्श भाग 1/रहीम के दोहे/rahim ke dohe.pdf',

          },
          {
            id: 'एवरेस्ट_ मेरी शिखर यात्रा',
            name: 'एवरेस्ट_ मेरी शिखर यात्रा',

            contentPath: '/FinalContent/Class 9th/Hindi/स्पर्श भाग 1/एवरेस्ट_ मेरी शिखर यात्रा/index.html',
            pdfPath: '/FinalContent/Class 9th/Hindi/स्पर्श भाग 1/एवरेस्ट_ मेरी शिखर यात्रा/Everest meri shikhar yatra.pdf',

          },
          {
            id: 'गीत-अगीत',
            name: 'गीत-अगीत',

            contentPath: '/FinalContent/Class 9th/Hindi/स्पर्श भाग 1/गीत-अगीत/index.html',
            pdfPath: '/FinalContent/Class 9th/Hindi/स्पर्श भाग 1/गीत-अगीत/geet ageet.pdf',

          },
          {
            id: 'तुम कब जाओगे, अतिथि',
            name: 'तुम कब जाओगे, अतिथि',

            contentPath: '/FinalContent/Class 9th/Hindi/स्पर्श भाग 1/तुम कब जाओगे, अतिथि/index.html',
            pdfPath: '/FinalContent/Class 9th/Hindi/स्पर्श भाग 1/तुम कब जाओगे, अतिथि/tum kab aaoge atithi.pdf',

          },
          {
            id: 'दुःख का अधिकार',
            name: 'दुःख का अधिकार',

            contentPath: '/FinalContent/Class 9th/Hindi/स्पर्श भाग 1/दुःख का अधिकार/index.html',
            pdfPath: '/FinalContent/Class 9th/Hindi/स्पर्श भाग 1/दुःख का अधिकार/dukh ka adhikar.pdf',

          },
          {
            id: 'रैदास के पद 2',
            name: 'रैदास के पद 2',

            contentPath: '/FinalContent/Class 9th/Hindi/स्पर्श भाग 1/रैदास के पद 2/index.html',
            pdfPath: '/FinalContent/Class 9th/Hindi/स्पर्श भाग 1/रैदास के पद 2/redas ke pad.pdf',

          },
          {
            id: 'वैज्ञानिक चेतना के वाहक चंद्रशेखर वेंकट रामन्',
            name: 'वैज्ञानिक चेतना के वाहक चंद्रशेखर वेंकट रामन्',

            contentPath: '/FinalContent/Class 9th/Hindi/स्पर्श भाग 1/वैज्ञानिक चेतना के वाहक चंद्रशेखर वेंकट रामन्/index.html',
            pdfPath: '/FinalContent/Class 9th/Hindi/स्पर्श भाग 1/वैज्ञानिक चेतना के वाहक चंद्रशेखर वेंकट रामन्/vaigyanic chetna.pdf',

          },
          {
            id: 'शुक्रतारे के समान',
            name: 'शुक्रतारे के समान',

            contentPath: '/FinalContent/Class 9th/Hindi/स्पर्श भाग 1/शुक्रतारे के समान/index.html',
            pdfPath: '/FinalContent/Class 9th/Hindi/स्पर्श भाग 1/शुक्रतारे के समान/Shukratare ke saman.pdf',

          }
        ]
      }
    ]
    },
    {
      id: 'Mathematics',
      name: 'Mathematics',
      icon: "📐",
      color: '#10B981',

      chapters: [
        {
          id: 'Mathematics Topics',
          name: 'Mathematics Topics',
          icon: "📐",
          color: '#10B981',
          topics: [
            {
              id: 'number-systems',
              name: 'Number Systems',

              contentPath: '/FinalContent/Class 9th/Mathematics/Number Systems/Number Systems.html',
              pdfPath: '/FinalContent/Class 9th/Mathematics/Number Systems/Number System.pdf',

              subtopics: [
                {
                  id: 'real-numbers',
                  name: 'Real Numbers',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Number Systems/Real Numbers.html',

                },
                {
                  id: 'irrational-numbers',
                  name: 'Irrational Numbers',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Number Systems/Irrational Numbers.html',

                },
                {
                  id: 'decimal-expansions',
                  name: 'Decimal Expansions',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Number Systems/Decimal Expansions.html',

                }
              ]
            },
            {
              id: 'polynomials',
              name: 'Polynomials',

              contentPath: '/FinalContent/Class 9th/Mathematics/Polynomials/Polynomials.html',
              pdfPath: '/FinalContent/Class 9th/Mathematics/Polynomials/Polynomials.pdf',

              subtopics: [
                {
                  id: 'polynomial-types',
                  name: 'Types of Polynomials',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Polynomials/Polynomial Types.html',

                },
                {
                  id: 'zeros-of-polynomials',
                  name: 'Zeros of Polynomials',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Polynomials/Zeros of Polynomials.html',

                },
                {
                  id: 'factorization',
                  name: 'Factorization of Polynomials',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Polynomials/Factorization of Polynomials.html',

                },
                {
                  id: 'algebraic-identities',
                  name: 'Algebraic Identities',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Polynomials/Algebraic Identities.html',

                }
              ]
            },
            {
              id: 'coordinate-geometry',
              name: 'Coordinate Geometry',

              contentPath: '/FinalContent/Class 9th/Mathematics/Coordinate Geometry/Understanding Position in a Plane.html',
              pdfPath: '/FinalContent/Class 9th/Mathematics/Coordinate Geometry/Coordinate geometry.pdf',

              subtopics: [
                {
                  id: 'cartesian-system',
                  name: 'Cartesian Coordinate System',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Coordinate Geometry/Building Cartesian Coordinate System.html',

                },
                {
                  id: 'plotting-coordinates',
                  name: 'Plotting Coordinates',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Coordinate Geometry/Reading Writing Plotting Coordinates.html',

                },
                {
                  id: 'positions-in-plane',
                  name: 'Understanding Positions in a Plane',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Coordinate Geometry/Understanding Position in a Plane.html',

                }
              ]
            },
            {
              id: 'linear-equations-two-variables',
              name: 'Linear Equations in Two Variables',

              contentPath: '/FinalContent/Class 9th/Mathematics/Linear Equations in Two Variables/Linear Equation in two variables.html',
              pdfPath: '/FinalContent/Class 9th/Mathematics/Linear Equations in Two Variables/linear equation in two variables.pdf',

            },
            {
              id: 'euclids-geometry',
              name: 'Introduction to Euclid\'s Geometry',

              contentPath: '/FinalContent/Class 9th/Mathematics/Introduction to Euclid’s Geometry/The Evolution of Geometry.html',
              pdfPath: '/FinalContent/Class 9th/Mathematics/Introduction to Euclid’s Geometry/Introduction to Euclid_s geometry.pdf',

              subtopics: [
                {
                  id: 'evolution-of-geometry',
                  name: 'The Evolution of Geometry',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Introduction to Euclid’s Geometry/The Evolution of Geometry.html',

                },
                {
                  id: 'axioms-postulates',
                  name: 'What Are Axioms and Postulates',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Introduction to Euclid’s Geometry/What Are Axioms and Postulates.html',

                },
                {
                  id: 'euclids-seven-axioms',
                  name: 'Euclid\'s Seven Axioms',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Introduction to Euclid’s Geometry/Euclid_s Seven Axioms (Common Notions).html',

                }
              ]
            },
            {
              id: 'lines-and-angles',
              name: 'Lines and Angles',

              contentPath: '/FinalContent/Class 9th/Mathematics/Lines and Angles/Fundamentals Lines, Angles and their Types.html',
              pdfPath: '/FinalContent/Class 9th/Mathematics/Lines and Angles/Lines and Angles.pdf',

              subtopics: [
                {
                  id: 'fundamentals-lines-angles',
                  name: 'Fundamentals - Lines, Angles and Their Types',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Lines and Angles/Fundamentals Lines, Angles and their Types.html',

                },
                {
                  id: 'parallel-lines',
                  name: 'Parallel Lines',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Lines and Angles/Parallel Lines.html',

                },
                {
                  id: 'lines-angles-part2',
                  name: 'Lines And Angles Part 2',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Lines and Angles/Lines and Angles Part2.html',

                },
                {
                  id: 'lines-angles-part3',
                  name: 'Lines And Angles Part 3',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Lines and Angles/Lines and angles Part3.html',

                }
              ]
            },
            {
              id: 'triangles',
              name: 'Triangles',

              contentPath: '/FinalContent/Class 9th/Mathematics/Triangles/Triangles Introduction.html',
              pdfPath: '/FinalContent/Class 9th/Mathematics/Triangles/Triangles.pdf',

              subtopics: [
                {
                  id: 'introduction-triangles',
                  name: 'Introduction to Triangles',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Triangles/Triangles Introduction.html',

                },
                {
                  id: 'congruence-criteria',
                  name: 'Congruence Criteria (SAS, ASA, AAS)',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Triangles/Congruence Criteria SAS ASA AAS.html',

                },
                {
                  id: 'isosceles-triangles',
                  name: 'Isosceles Triangles',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Triangles/Isosceles triangles.html',

                }
              ]
            },
            {
              id: 'quadrilaterals',
              name: 'Quadrilaterals',

              contentPath: '/FinalContent/Class 9th/Mathematics/Quadrilaterals/Quadrilateral part1.html',
              pdfPath: '/FinalContent/Class 9th/Mathematics/Quadrilaterals/Quadrilaterals.pdf',

              subtopics: [
                {
                  id: 'quadrilaterals-part1',
                  name: 'Quadrilaterals Part 1',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Quadrilaterals/Quadrilateral part1.html',

                },
                {
                  id: 'quadrilaterals-part2',
                  name: 'Quadrilaterals Part 2',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Quadrilaterals/Quadrilateral part2.html',

                }
              ]
            },
            {
              id: 'circles',
              name: 'Circles',

              contentPath: '/FinalContent/Class 9th/Mathematics/Circles/Circles part 1.html',
              pdfPath: '/FinalContent/Class 9th/Mathematics/Circles/Circles.pdf',

              subtopics: [
                {
                  id: 'circles-part1',
                  name: 'Circles Part 1',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Circles/Circles part 1.html',

                },
                {
                  id: 'circles-part2',
                  name: 'Circles Part 2',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Circles/Circles part 2.html',

                },
                {
                  id: 'circles-part3',
                  name: 'Circles Part 3',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Circles/Circles part 3.html',

                }
              ]
            },
            {
              id: 'herons-formula',
              name: 'Heron\'s Formula',

              contentPath: '/FinalContent/Class 9th/Mathematics/Heron_s Formula/Heron_s formula.html',
              pdfPath: '/FinalContent/Class 9th/Mathematics/Heron_s Formula/Heron_s Formula.pdf',
            },
            {
              id: 'surface-area-volume',
              name: 'Surface Area and Volume',

              contentPath: '/FinalContent/Class 9th/Mathematics/Surface Area and volume/Surface Area Right Circular Cone.html',
              pdfPath: '/FinalContent/Class 9th/Mathematics/Surface Area and volume/Surface areas and volumes.pdf',

              subtopics: [
                {
                  id: 'surface-area-cone',
                  name: 'Surface Area of Right Circular Cone',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Surface Area and volume/Surface Area Right Circular Cone.html',

                },
                {
                  id: 'surface-area-sphere',
                  name: 'Surface Area of Sphere',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Surface Area and volume/Surface Area Sphere.html',

                },
                {
                  id: 'volume-cone',
                  name: 'Volume of Cone',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Surface Area and volume/Volume cone.html',

                },
                {
                  id: 'volume-sphere',
                  name: 'Volume of Sphere',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Surface Area and volume/Volume sphere.html',

                }
              ]
            },
            {
              id: 'statistics',
              name: 'Statistics',

              contentPath: '/FinalContent/Class 9th/Mathematics/Statistics/Statistics Bargraph.HTML',
              pdfPath: '/FinalContent/Class 9th/Mathematics/Statistics/Statistics.pdf',

              subtopics: [
                {
                  id: 'statistics-bargraph',
                  name: 'Statistics Bar Graph',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Statistics/Statistics Bargraph.HTML',

                },
                {
                  id: 'statistics-histogram',
                  name: 'Statistics Histogram',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Statistics/Statistics histogram.html',

                },
                {
                  id: 'statistics-frequency-polygon',
                  name: 'Statistics Frequency Polygon',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Statistics/Statistics Frequency polygon.html',

                }
              ]
            }
          ]
        }
      ]
    }
  ],
  '10th': [
    {
      id: 'Science',
    name: 'Science', 
    icon: "🔬",
    color: '#F59E0B',

    chapters: [
      {
          id: 'Physics',
        name: 'Physics',
        icon: "⚡",
        color: '#F59E0B',
        topics: [
            {
              id: 'Electricity',
              name: 'Electricity',

              contentPath: '/FinalContent/Class 10th/Science/Physics/Electricity/index.html',
              pdfPath: '/FinalContent/Class 10th/Science/Physics/Electricity/Electricity.pdf',
              subtopics: [
                {
                  id: 'ohms_law',
                  name: "Ohm's law",
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Electricity/ohms_law.html',

                },
                {
                  id: 'Electricity_Part_1_latest',
                  name: 'Electricity Part 1',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Electricity/Electricity Part 1_latest.html',

                },
                {
                  id: 'Electricity_Part2_latest',
                  name: 'Electricity Part 2',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Electricity/Electricity Part2_latest.html',

                },
                {
                  id: 'Electricity_Part3_latest',
                  name: 'Electricity Part 3',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Electricity/Electricity Part3_latest.html',

                },
                {
                  id: 'Electricity_Part4_latest',
                  name: 'Electricity Part 4',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Electricity/Electricity Part4_latest.html',

                }
              ]
            },
            {
              id: 'Light Refraction',
              name: 'Light - Reflection and Refraction',

              contentPath: '/FinalContent/Class 10th/Science/Physics/Light Refraction/index.html',
              pdfPath: '/FinalContent/Class 10th/Science/Physics/Light Refraction/Light – Reflection and Refraction.pdf',
              subtopics: [
                {
                  id: '1_reflection-of-light',
                  name: 'Reflection of Light',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Light Refraction/1_reflection-of-light.html',

                },
                {
                  id: '2_spherical-mirrors',
                  name: 'Spherical Mirrors',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Light Refraction/2 - spherical-mirrors.html',

                },
                {
                  id: '3_Refraction_glass_slab',
                  name: 'Refraction through Glass Slab',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Light Refraction/3_Refraction_glass_slab.html',

                },
                {
                  id: '4_Refraction',
                  name: 'Refraction',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Light Refraction/4 - ( 9.3.2 - 3) Refraction.html',

                }
              ]
            },
            {
              id: 'Human Eye and the Colourful World',
              name: 'Human Eye and the Colourful World',

              contentPath: '/FinalContent/Class 10th/Science/Physics/Human Eye and the Colourful World/index.html',
              pdfPath: '/FinalContent/Class 10th/Science/Physics/Human Eye and the Colourful World/The Human Eye and the Colourful World.pdf',
              subtopics: [
                {
                  id: '1_The_Human_Eye',
                  name: 'The Human Eye',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Human Eye and the Colourful World/1_The Human Eye.html',

                },
                {
                  id: '2_DEFECTS_OF_VISION_AND_THEIR_CORRECTION',
                  name: 'Defects of Vision and Their Correction',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Human Eye and the Colourful World/2_DEFECTS OF VISION AND THEIR CORRECTION.html',

                },
                {
                  id: '3_REFRACTION_OF_LIGHT_THROUGH_A_PRISM',
                  name: 'Refraction of Light Through a Prism',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Human Eye and the Colourful World/3_REFRACTION OF LIGHT THROUGH A PRISM.html',

                },
                {
                  id: '4_DISPERSION_OF_WHITE_LIGHT_BY_A_GLASS_PRISM',
                  name: 'Dispersion of White Light by a Glass Prism',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Human Eye and the Colourful World/4_DISPERSION OF WHITE LIGHT BY A GLASS PRISM ASS PRISMASS PRISM.html',

                },
                {
                  id: '5_atmospheric_refraction',
                  name: 'Atmospheric Refraction',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Human Eye and the Colourful World/5_atmospheric_refraction.html',

                },
                {
                  id: '6_scattering_light',
                  name: 'Scattering of Light',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Human Eye and the Colourful World/6_scattering_light.html',

                }
              ]
            },
            {
              id: 'Magnetic Effects of Electric Current',
              name: 'Magnetic Effects of Electric Current',

              contentPath: '/FinalContent/Class 10th/Science/Physics/Magnetic Effects of Electric Current/index.html',
              pdfPath: '/FinalContent/Class 10th/Science/Physics/Magnetic Effects of Electric Current/Magnetic Effects of Electric Current.pdf',
              subtopics: [
                {
                  id: 'Magnetic_Effects',
                  name: 'Magnetic Effects',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Magnetic Effects of Electric Current/12.1 magnetic effect.html',

                },
                {
                  id: 'MAGNETIC_FIELD_DUE_TO_A_CURRENT_CARRYING_CONDUCTOR',
                  name: 'Magnetic Field Due to a Current Carrying Conductor',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Magnetic Effects of Electric Current/12.2 MAGNETIC FIELD DUE TO A CURRENT-CARRYING ARRYING CONDUCTOR.html',

                },
                {
                  id: 'Magnetic_Effects_of_Electric_Current_Part_3_latest',
                  name: 'Force on a current Carrying Conductor in a Magnetic Field',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Magnetic Effects of Electric Current/12.3 FORCE ON A CURRENT-CARRYING CONDUCTOR IN A MAGNETIC FIELD.html',

                },
                {
                  id: 'Magnetic_Effects_of_Electric_Current_Part_4_latest',
                  name: 'Domestic Circuit',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Magnetic Effects of Electric Current/12.4 domestic-circuit.html',

                }
              ]
            }
          ]
        },
        {
          id: 'Chemistry',
        name: 'Chemistry',
        icon: "🧪",
        color: '#F59E0B',
        topics: [
            {
              id: 'Carbon and its Compound',
              name: 'Carbon and its Compounds',

              contentPath: '/FinalContent/Class 10th/Science/Chemistry/Carbon and its Compound/index.html',
              pdfPath: '/FinalContent/Class 10th/Science/Chemistry/Carbon and its Compound/Carbon and its Compounds.pdf',
              subtopics: [
                {
                  id: 'ionic_bonds',
                  name: 'Ionic Bonds',
                  contentPath: '/FinalContent/Class 10th/Science/Chemistry/Carbon and its Compound/ionic_bonds.html',

                },
                {
                  id: 'Versatile_nature_of_Carbon',
                  name: 'Versatile Nature of Carbon',
                  contentPath: '/FinalContent/Class 10th/Science/Chemistry/Carbon and its Compound/Versatile_nature_of_Carbon.html',

                },
                {
                  id: 'Covalent_bond_and_carbon',
                  name: 'Covalent Bond and Carbon',
                  contentPath: '/FinalContent/Class 10th/Science/Chemistry/Carbon and its Compound/Covalent_bond_and_carbon.html',

                },
                {
                  id: 'Important_carbon_compund',
                  name: 'Important Carbon Compounds',
                  contentPath: '/FinalContent/Class 10th/Science/Chemistry/Carbon and its Compound/Important_carbon_compund.html',

                },
                {
                  id: 'Chemical_properties_of_carbon_compunds',
                  name: 'Chemical Properties of Carbon Compounds',
                  contentPath: '/FinalContent/Class 10th/Science/Chemistry/Carbon and its Compound/Chemical_properties_of_carbon_compunds.html',

                }
              ]
            }
          ]
        },
        {
          id: 'Biology',
        name: 'Biology',
        icon: "🧬",
        color: '#F59E0B',
        topics: [
            {
              id: 'Life Processes',
              name: 'Life Processes',

              contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/index.html',
              pdfPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/Life Processes.pdf',
              subtopics: [
                {
                  id: 'life_processes_exhibit',
                  name: 'Life Processes Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/life_processes_exhibit.html',

                },
                {
                  id: 'heterotrophic_nutrition_exhibit',
                  name: 'Heterotrophic Nutrition Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/heterotrophic_nutrition_exhibit.html',

                },
                {
                  id: 'human_digestive_system_exhibit',
                  name: 'Human Digestive System Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/human_digestive_system_exhibit.html',

                },
                {
                  id: 'human_digestion_process_exhibit',
                  name: 'Human Digestion Process Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/human_digestion_process_exhibit.html',

                },
                {
                  id: 'photosynthesis_exhibit',
                  name: 'Photosynthesis Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/photosynthesis_exhibit.html',

                },
                {
                  id: 'photosynthesis_experiments_exhibit',
                  name: 'Photosynthesis Experiments Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/photosynthesis_experiments_exhibit.html',

                },
                {
                  id: 'plant_transport_exhibit',
                  name: 'Plant Transport Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/plant_transport_exhibit.html',

                },
                {
                  id: 'transpiration_translocation_exhibit',
                  name: 'Transpiration and Translocation Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/transpiration_translocation_exhibit.html',

                },
                {
                  id: 'human_respiratory_system_exhibit',
                  name: 'Human Respiratory System Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/human_respiratory_system_exhibit.html',

                },
                {
                  id: 'cellular_respiration_exhibit',
                  name: 'Cellular Respiration Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/cellular_respiration_exhibit (1).html',

                },
                {
                  id: 'respiratory_pathways_exhibit',
                  name: 'Respiratory Pathways Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/respiratory_pathways_exhibit.html',

                },
                {
                  id: 'gas_transport_exhibit',
                  name: 'Gas Transport Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/gas_transport_exhibit.html',

                },
                {
                  id: 'circulatory_system_exhibit',
                  name: 'Circulatory System Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/circulatory_system_exhibit (1).html',

                },
                {
                  id: 'blood_vessels_exhibit',
                  name: 'Blood Vessels Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/blood_vessels_exhibit.html',

                },
                {
                  id: 'excretory_system_exhibit',
                  name: 'Excretory System Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/excretory_system_exhibit.html',

                },
                {
                  id: 'excretion_regulation_exhibit',
                  name: 'Excretion and Regulation Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/excretion_regulation_exhibit.html',

      }
    ]
  },
  { 
              id: 'Control and Coordination',
              name: 'Control and Coordination',

              contentPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/index.html',
              pdfPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/Control and Coordination.pdf',
              subtopics: [
                {
                  id: 'control_coordination_exhibit',
                  name: 'Control and Coordination Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/control_coordination_exhibit.html',

                },
                {
                  id: 'human_brain_structure_exhibit',
                  name: 'Human Brain Structure Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/human_brain_structure_exhibit.html',

                },
                {
                  id: 'neuron_structure_function_exhibit',
                  name: 'Neuron Structure and Function Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/neuron_structure_function_exhibit.html',

                },
                {
                  id: 'nervous_tissue_protection_exhibit',
                  name: 'Nervous Tissue Protection Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/nervous_tissue_protection_exhibit.html',

                },
                {
                  id: 'reflex_actions_exhibit',
                  name: 'Reflex Actions Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/reflex_actions_exhibit.html',

                },
                {
                  id: 'muscle_tissue_exhibit',
                  name: 'Muscle Tissue Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/muscle_tissue_exhibit.html',

                },
                {
                  id: 'animal_hormones_exhibit',
                  name: 'Animal Hormones Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/animal_hormones_exhibit.html',

                },
                {
                  id: 'plant_coordination_exhibit',
                  name: 'Plant Coordination Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/plant_coordination_exhibit.html',

                },
                {
                  id: 'plant_hormones_exhibit',
                  name: 'Plant Hormones Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/plant_hormones_exhibit.html',

      }
    ]
  },
  { 
              id: 'Reproduction',
              name: 'How do Organisms Reproduce?',

              contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/index.html',
              pdfPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/Reproduction.pdf',
              subtopics: [
                {
                  id: 'reproduction-dna-exhibit',
                  name: 'Reproduction and DNA Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/reproduction-dna-exhibit.html',

                },
                {
                  id: 'asexual-fission-exhibit',
                  name: 'Asexual Fission Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/asexual-fission-exhibit.html',

                },
                {
                  id: 'budding-vegetative-exhibit',
                  name: 'Budding and Vegetative Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/budding-vegetative-exhibit.html',

                },
                {
                  id: 'fragmentation-regeneration-exhibit',
                  name: 'Fragmentation and Regeneration Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/fragmentation-regeneration-exhibit.html',

                },
                {
                  id: 'spore-formation-exhibit',
                  name: 'Spore Formation Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/spore-formation-exhibit.html',

                },
                {
                  id: 'sexual_reproduction_exhibit',
                  name: 'Sexual Reproduction Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/sexual_reproduction_exhibit.html',

                },
                {
                  id: 'flowering_plant_reproduction_exhibit',
                  name: 'Flowering Plant Reproduction Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/flowering_plant_reproduction_exhibit.html',

                },
                {
                  id: 'male_reproductive_system_exhibit',
                  name: 'Male Reproductive System Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/male_reproductive_system_exhibit.html',

                },
                {
                  id: 'female_reproductive_system_exhibit',
                  name: 'Female Reproductive System Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/female_reproductive_system_exhibit.html',

                },
                {
                  id: 'fertilization_pregnancy_birth_exhibit',
                  name: 'Fertilization, Pregnancy and Birth Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/fertilization_pregnancy_birth_exhibit.html',

                },
                {
                  id: 'reproductive_health_contraception_exhibit',
                  name: 'Reproductive Health and Contraception Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/reproductive_health_contraception_exhibit.html',

                }
              ]
            },
            {
              id: 'Hereditary',
              name: 'Heredity and Evolution',

              contentPath: '/FinalContent/Class 10th/Science/Biology/Hereditary/index.html',
              pdfPath: '/FinalContent/Class 10th/Science/Biology/Hereditary/Heredity.pdf',
              subtopics: [
                {
                  id: 'inherited_traits_exhibit',
                  name: 'Inherited Traits Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Hereditary/inherited_traits_exhibit.html',

                },
                {
                  id: 'mendel_monohybrid_exhibit',
                  name: 'Mendel Monohybrid Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Hereditary/mendel_monohybrid_exhibit.html',

                },
                {
                  id: 'dihybrid_crosses_exhibit',
                  name: 'Dihybrid Crosses Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Hereditary/dihybrid_crosses_exhibit.html',

                },
                {
                  id: 'gamete_formation_exhibit',
                  name: 'Gamete Formation Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Hereditary/gamete_formation_exhibit.html',

                },
                {
                  id: 'sex_determination_exhibit',
                  name: 'Sex Determination Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Hereditary/sex_determination_exhibit (2).html',

                },
                {
                  id: 'molecular_basis_exhibit',
                  name: 'Molecular Basis Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Hereditary/molecular_basis_exhibit.html',

                },
                {
                  id: 'variation_heredity_exhibit',
                  name: 'Variation and Heredity Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Hereditary/variation_heredity_exhibit.html',

                }
              ]
            },
            {
              id: 'Our Environment',
              name: 'Our Environment',

              contentPath: '/FinalContent/Class 10th/Science/Biology/Our Environment/index.html',
              pdfPath: '/FinalContent/Class 10th/Science/Biology/Our Environment/Our Environment.pdf',
              subtopics: [
                {
                  id: 'ecosystem_exhibit',
                  name: 'Ecosystem Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Our Environment/ecosystem_exhibit.html',

                },
                {
                  id: 'food_chains_exhibit',
                  name: 'Food Chains Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Our Environment/food_chains_exhibit.html',

                },
                {
                  id: 'environmental_impact_exhibit',
                  name: 'Environmental Impact Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Our Environment/environmental_impact_exhibit.html',

                },
                {
                  id: 'waste_management_exhibit',
                  name: 'Waste Management Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Our Environment/waste_management_exhibit.html',

                }
              ]
            }
        ]
      }
    ]
  },
  { 
      id: 'English',
    name: 'English', 
    icon: "📖",
    color: '#8B5CF6',

    chapters: [
      {
          id: 'First Flight – Main textbook (prose and poetry)',
          name: 'First Flight – Main textbook (prose and poetry)',
        icon: "📝",
        color: '#8B5CF6',
        topics: [
            {
              id: 'A letter to God',
              name: 'A Letter to God',

              contentPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/A letter to God/index.html',
              pdfPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/A letter to God/A letter to god.pdf'
            },
            {
              id: 'Nelson Mandela long Walk to Freedom',
              name: 'Nelson Mandela: Long Walk to Freedom',

              contentPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/Nelson Mandela long Walk to Freedom/index.html',
              pdfPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/Nelson Mandela long Walk to Freedom/Nelson Mandela.pdf'
            },
            {
              id: 'Two Stories about Flying',
              name: 'Two Stories about Flying',

              contentPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/Two Stories about Flying/index.html',
              pdfPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/Two Stories about Flying/Two stories about flying.pdf'
            },
            {
              id: 'From Diary of Anne Frank',
              name: 'From the Diary of Anne Frank',

              contentPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/From Diary of Anne Frank/index.html',
              pdfPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/From Diary of Anne Frank/From the diary of anne frank.pdf'
            },
            {
              id: 'The Sermon at Benares ',
              name: 'The Sermon at Benares',

              contentPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/The Sermon at Benares/index.html',
              pdfPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/The Sermon at Benares/The sermon at Benares.pdf'
            },
            {
              id: 'Mijbil the Otter',
              name: 'Mijbil the Otter',

              contentPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/Mijbil the Otter/index.html',
              pdfPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/Mijbil the Otter/Mijbil the otter.pdf'
            },
            {
              id: 'Madam rides the Bus',
              name: 'Madam Rides the Bus',

              contentPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/Madam rides the Bus/index.html',
              pdfPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/Madam rides the Bus/Madam rides the bus.pdf'
            },
            {
              id: 'The Proposal',
              name: 'The Proposal',

              contentPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/The Proposal/index.html',
              pdfPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/The Proposal/The proposal.pdf'
            }
          ]
        },
        {
          id: 'Footprints Without Feet – Supplementary reader (short stories)',
          name: 'Footprints Without Feet – Supplementary reader (short stories)',
        icon: "📕",
        color: '#8B5CF6',
          topics: [
            {
              id: 'A Question of trust',
              name: 'A Question of Trust',

              contentPath: '/FinalContent/Class 10th/English/Footprints Without Feet – Supplementary reader (short stories)/A Question of trust/index.html',
              pdfPath: '/FinalContent/Class 10th/English/Footprints Without Feet – Supplementary reader (short stories)/A Question of trust/A Question of Trust.pdf'
            },
            {
              id: 'A Triumph of surgery',
              name: 'A Triumph of Surgery',

              contentPath: '/FinalContent/Class 10th/English/Footprints Without Feet – Supplementary reader (short stories)/A Triumph of surgery/index.html',
              pdfPath: '/FinalContent/Class 10th/English/Footprints Without Feet – Supplementary reader (short stories)/A Triumph of surgery/A triumph of Surgery.pdf'
            },
            {
              id: 'Bholi',
              name: 'Bholi',

              contentPath: '/FinalContent/Class 10th/English/Footprints Without Feet – Supplementary reader (short stories)/Bholi/index.html',
              pdfPath: '/FinalContent/Class 10th/English/Footprints Without Feet – Supplementary reader (short stories)/Bholi/Bholi.pdf'
            },
            {
              id: 'Footprints without Feet',
              name: 'Footprints Without Feet',

              contentPath: '/FinalContent/Class 10th/English/Footprints Without Feet – Supplementary reader (short stories)/Footprints without Feet/index.html',
              pdfPath: '/FinalContent/Class 10th/English/Footprints Without Feet – Supplementary reader (short stories)/Footprints without Feet/Footprints without feet.pdf'
            },
            {
              id: 'The Book that Saved the Earth',
              name: 'The Book that Saved the Earth',

              contentPath: '/FinalContent/Class 10th/English/Footprints Without Feet – Supplementary reader (short stories)/The Book that Saved the Earth/index.html',
              pdfPath: '/FinalContent/Class 10th/English/Footprints Without Feet – Supplementary reader (short stories)/The Book that Saved the Earth/The Book that saved the Earth.pdf'
            },
            {
              id: 'The making of a Scientist',
              name: 'The Making of a Scientist',

              contentPath: '/FinalContent/Class 10th/English/Footprints Without Feet – Supplementary reader (short stories)/The making of a Scientist/index.html',
              pdfPath: '/FinalContent/Class 10th/English/Footprints Without Feet – Supplementary reader (short stories)/The making of a Scientist/The making of Scientist.pdf'
            },
            {
              id: 'The Midnight Visitor',
              name: 'The Midnight Visitor',

              contentPath: '/FinalContent/Class 10th/English/Footprints Without Feet – Supplementary reader (short stories)/The Midnight Visitor/index.html',
              pdfPath: '/FinalContent/Class 10th/English/Footprints Without Feet – Supplementary reader (short stories)/The Midnight Visitor/The Midnight Visitor.pdf'
            },
            {
              id: 'The Necklace',
              name: 'The Necklace',

              contentPath: '/FinalContent/Class 10th/English/Footprints Without Feet – Supplementary reader (short stories)/The Necklace/index.html',
              pdfPath: '/FinalContent/Class 10th/English/Footprints Without Feet – Supplementary reader (short stories)/The Necklace/The Necklace.pdf'
            },
            {
              id: 'The Thief_s Story',
              name: "The Thief's Story",

              contentPath: '/FinalContent/Class 10th/English/Footprints Without Feet – Supplementary reader (short stories)/The Thief_s Story/index.html',
              pdfPath: '/FinalContent/Class 10th/English/Footprints Without Feet – Supplementary reader (short stories)/The Thief_s Story/The Thief_s Story.pdf'
            }
          ]
        }
        ,
        {
          id: 'Words and Expressions –(practice in grammar, comprehension, writing)',
          name: 'Words and Expressions – Practice (grammar, comprehension, writing)',
          icon: "📕",
          color: '#8B5CF6',
          topics: [
            {
              id: 'From the Diary of Anne Frank',
              name: 'From the Diary of Anne Frank',

              contentPath: '/FinalContent/Class 10th/English/Words and Expressions –(practice in grammar, comprehension, writing)/From the Diary of Anne Frank/index.html',
              pdfPath: '/FinalContent/Class 10th/English/Words and Expressions –(practice in grammar, comprehension, writing)/From the Diary of Anne Frank/From the diary of anne frank.pdf'
            },
            {
              id: 'Glimpses of India',
              name: 'Glimpses of India',

              contentPath: '/FinalContent/Class 10th/English/Words and Expressions –(practice in grammar, comprehension, writing)/Glimpses of India/index.html',
              pdfPath: '/FinalContent/Class 10th/English/Words and Expressions –(practice in grammar, comprehension, writing)/Glimpses of India/The Book that saved the Earth.pdf'
            },
            {
              id: 'Madam Rides the Bus',
              name: 'Madam Rides the Bus',

              contentPath: '/FinalContent/Class 10th/English/Words and Expressions –(practice in grammar, comprehension, writing)/Madam Rides the Bus/index.html',
              pdfPath: '/FinalContent/Class 10th/English/Words and Expressions –(practice in grammar, comprehension, writing)/Madam Rides the Bus/Madam rides the bus.pdf'
            },
            {
              id: 'Mijbil the Otter',
              name: 'Mijbil the Otter',

              contentPath: '/FinalContent/Class 10th/English/Words and Expressions –(practice in grammar, comprehension, writing)/Mijbil the Otter/index.html',
              pdfPath: '/FinalContent/Class 10th/English/Words and Expressions –(practice in grammar, comprehension, writing)/Mijbil the Otter/Mijbil the otter.pdf'
            },
            {
              id: 'The Proposal',
              name: 'The Proposal',

              contentPath: '/FinalContent/Class 10th/English/Words and Expressions –(practice in grammar, comprehension, writing)/The Proposal/index.html',
              pdfPath: '/FinalContent/Class 10th/English/Words and Expressions –(practice in grammar, comprehension, writing)/The Proposal/The proposal.pdf'
            },
            {
              id: 'The Sermon at Benares',
              name: 'The Sermon at Benares',

              contentPath: '/FinalContent/Class 10th/English/Words and Expressions –(practice in grammar, comprehension, writing)/The Sermon at Benares/index.html',
              pdfPath: '/FinalContent/Class 10th/English/Words and Expressions –(practice in grammar, comprehension, writing)/The Sermon at Benares/The sermon at Benares.pdf'
            }
          ]
        }
      ]
    },
    {
      id: 'Social Science',
      name: 'Social Science',
      icon: "🌍",
      color: '#EF4444',

      chapters: [
        {
          id: 'Economics',
          name: 'Economics',
          icon: "💰",
          color: '#EF4444',
        topics: [
            {
              id: 'Development',
              name: 'Development',

              contentPath: '/FinalContent/Class 10th/Social Science/Economics/Development/index.html',
              pdfPath: '/FinalContent/Class 10th/Social Science/Economics/Development/Development.pdf'
            },
            {
              id: 'Sectors of the Indian Economy',
              name: 'Sectors of the Indian Economy',

              contentPath: '/FinalContent/Class 10th/Social Science/Economics/Sectors of the Indian Economy/index.html',
              pdfPath: '/FinalContent/Class 10th/Social Science/Economics/Sectors of the Indian Economy/SECTORS OF THE INDIAN ECONOMY.pdf'
            },
            {
              id: 'Money and Credit',
              name: 'Money and Credit',

              contentPath: '/FinalContent/Class 10th/Social Science/Economics/Money and Credit/index.html',
              pdfPath: '/FinalContent/Class 10th/Social Science/Economics/Money and Credit/MONEY AND CREDIT.pdf'
            },
            {
              id: 'Globalization and Indian Economy',
              name: 'Globalization and the Indian Economy',

              contentPath: '/FinalContent/Class 10th/Social Science/Economics/Globalization and Indian Economy/index.html',
              pdfPath: '/FinalContent/Class 10th/Social Science/Economics/Globalization and Indian Economy/GLOBALISATION AND THE INDIAN ECONOMY.pdf'
            },
            {
              id: 'Consumer Rights',
              name: 'Consumer Rights',

              contentPath: '/FinalContent/Class 10th/Social Science/Economics/Consumer Rights/index.html',
              pdfPath: '/FinalContent/Class 10th/Social Science/Economics/Consumer Rights/CONSUMER RIGHTS.pdf'
            }
          ]
        },
        {
          id: 'Democratic Politics',
          name: 'Democratic Politics',
          icon: "👥",
          color: '#EF4444',
          topics: [
            {
              id: 'Power Sharing',
              name: 'Power Sharing',

              contentPath: '/FinalContent/Class 10th/Social Science/Democratic Politics/Power Sharing/index.html',
              pdfPath: '/FinalContent/Class 10th/Social Science/Democratic Politics/Power Sharing/Power Sharing.pdf',

            },
            {
              id: 'Federalism',
              name: 'Federalism',

              contentPath: '/FinalContent/Class 10th/Social Science/Democratic Politics/Federalism/index.html',
              pdfPath: '/FinalContent/Class 10th/Social Science/Democratic Politics/Federalism/Federalism.pdf',

            },
            {
              id: 'Gender, Religion and Caste',
              name: 'Gender, Religion and Caste',

              contentPath: '/FinalContent/Class 10th/Social Science/Democratic Politics/Gender, Religion and Caste/index.html',
              pdfPath: '/FinalContent/Class 10th/Social Science/Democratic Politics/Gender, Religion and Caste/Gender Religion and Caste.pdf',

            },
            {
              id: 'Political Parties',
              name: 'Political Parties',

              contentPath: '/FinalContent/Class 10th/Social Science/Democratic Politics/Political Parties/index.html',
              pdfPath: '/FinalContent/Class 10th/Social Science/Democratic Politics/Political Parties/Political Parties.pdf',

            },
            {
              id: 'Outcome of Democracy',
              name: 'Outcome of Democracy',

              contentPath: '/FinalContent/Class 10th/Social Science/Democratic Politics/Outcome of Democracy/index.html',
              pdfPath: '/FinalContent/Class 10th/Social Science/Democratic Politics/Outcome of Democracy/Outcome of Democracy.pdf',

            }
          ]
        },
        {
          id: 'History',
          name: 'History',
          icon: "🏛️",
          color: '#EF4444',
        topics: [
            {
              id: 'The Rise of Nationalism in Europe',
              name: 'The Rise of Nationalism in Europe',

              contentPath: 'https://www.youtube.com/watch?v=3DPXXlCMLx8',

              pdfPath: '/FinalContent/Class 10th/Social Science/History/The Rise of Nationalism in Europe.pdf',

            },
            {
              id: 'Nationalism in India',
              name: 'Nationalism in India',

              contentPath: 'https://www.youtube.com/watch?v=DlNrnWc1BVQ',

              pdfPath: '/FinalContent/Class 10th/Social Science/History/Nationalism in India.pdf',

            },
            {
              id: 'The Age of Industrialisation',
              name: 'The Age of Industrialisation',

              contentPath: 'https://www.youtube.com/watch?v=cZsYhzubOcI',

              pdfPath: '/FinalContent/Class 10th/Social Science/History/The Age of Industrialisation.pdf',

            },
            {
              id: 'Print Culture and the Modern World',
              name: 'Print Culture and the Modern World',

              contentPath: 'https://www.youtube.com/watch?v=RXHbXcyeZf4',

              pdfPath: '/FinalContent/Class 10th/Social Science/History/Print Culture and the Modern World.pdf',

            }
        ]
      }
    ]
  },
  { 
      id: 'Hindi',
    name: 'Hindi', 
    icon: "🗣️",
    color: '#06B6D4',

    chapters: [
      {
        id: 'स्पर्श भाग 2',
        name: 'स्पर्श भाग 2',
        icon: "📝",
        color: '#06B6D4',
        topics: [
          {
            id: 'बड़े भाई साहब',
            name: 'बड़े भाई साहब',

            contentPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/बड़े भाई साहब/index.html',
            pdfPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/बड़े भाई साहब/bade bhai sahab.pdf',

          },
          {
            id: 'साखी',
            name: 'साखी',

            contentPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/साखी/index.html',
            pdfPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/साखी/saakhi.pdf',

          },
          {
            id: 'पर्वत प्रदेश में पावस',
            name: 'पर्वत प्रदेश में पावस',

            contentPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/पर्वत प्रदेश में पावस/index.html',
            pdfPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/पर्वत प्रदेश में पावस/parvat pradesh me pavas.pdf',

          },
          {
            id: 'तोप',
            name: 'तोप',

            contentPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/तोप/index.html',
            pdfPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/तोप/tope.pdf',

          },
          {
            id: 'कारतूस',
            name: 'कारतूस',

            contentPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/कारतूस/index.html',
            pdfPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/कारतूस/kartoos.pdf',

          },
          {
            id: 'कर चले हम फ़िदा',
            name: 'कर चले हम फ़िदा',

            contentPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/कर चले हम फ़िदा/index.html',
            pdfPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/कर चले हम फ़िदा/kar chale ham fida.pdf',

          },
          {
            id: 'अब कहाँ दूसरे के दुख से दुखी होने वाले',
            name: 'अब कहाँ दूसरे के दुख से दुखी होने वाले',

            contentPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/अब कहाँ दूसरे के दुख से दुखी होने वाले/index.html',
            pdfPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/अब कहाँ दूसरे के दुख से दुखी होने वाले/ab kaha dusre ke dukh me.pdf',

          },
          {
            id: 'तताँरा-वामीरो कथा',
            name: 'तताँरा-वामीरो कथा',

            contentPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/तताँरा-वामीरो कथा/index.html',
            pdfPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/तताँरा-वामीरो कथा/tantara vamiro katha.pdf',

          },
          {
            id: 'मीरा के पद',
            name: 'मीरा के पद',

            contentPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/मीरा के पद/index.html',
            pdfPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/मीरा के पद/meera.pdf',

          },
          {
            id: 'गिन्नी का सोना और झेन की देन',
            name: 'गिन्नी का सोना और झेन की देन',

            contentPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/गिन्नी का सोना और झेन की देन/index.html',
            pdfPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/गिन्नी का सोना और झेन की देन/ginni ka sona.pdf',

          },
          {
            id: 'रवींद्रनाथ ठाकुर की आत्मत्राण',
            name: 'रवींद्रनाथ ठाकुर की आत्मत्राण',

            contentPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/रवींद्रनाथ ठाकुर की आत्मत्राण/index.html',
            pdfPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/रवींद्रनाथ ठाकुर की आत्मत्राण/atmatrana.pdf',

          },
          {
            id: 'मनुष्यता',
            name: 'मनुष्यता',

            contentPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/मनुष्यता/index.html',
            pdfPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/मनुष्यता/manushyata.pdf',

          },
          {
            id: 'तीसरी कसम',
            name: 'तीसरी कसम',

            contentPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/तीसरी कसम/index.html',
            pdfPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/तीसरी कसम/teesri kasam.pdf',

          },
          {
            id: 'डायरी का एक पन्ना',
            name: 'डायरी का एक पन्ना',

            contentPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/डायरी का एक पन्ना/index.html',
            pdfPath: '/FinalContent/Class 10th/Hindi/स्पर्श भाग 2/डायरी का एक पन्ना/diary ka ek panna.pdf',

          }
        ]
      }
    ]
    },
    {
      id: 'Mathematics',
      name: 'Mathematics',
      icon: "📐",
      color: '#10B981',

    chapters: [
      {
          id: 'Mathematics Topics',
          name: 'Mathematics Topics',
          icon: "📐",
          color: '#10B981',
        topics: [
            {
              id: 'Real Numbers',
              name: 'Real Numbers',

              contentPath: '/FinalContent/Class 10th/Mathematics/Real Numbers/Introduction.html',
              pdfPath: '/FinalContent/Class 10th/Mathematics/Real Numbers/Real numbers.pdf',

              subtopics: [
                {
                  id: 'introduction-to-real-numbers',
                  name: 'Introduction to Real Numbers',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Real Numbers/Introduction_to_real_numbers.html',

                },
                {
                  id: 'introduction',
                  name: 'Introduction',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Real Numbers/Introduction.html',

                },
                {
                  id: 'fundamental-theorem',
                  name: 'Fundamental Theorem of Arithmetic',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Real Numbers/Fundamental Theorem Of Arithmetic.html',

                },
                {
                  id: 'hcf-lcm-applications',
                  name: 'Applications of HCF and LCM',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Real Numbers/Applications Of Fundamental Theorem - HCF and LCM.html',

                },
                {
                  id: 'digit-endings',
                  name: 'Checking Digit Endings',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Real Numbers/Checking Digit Endings Using Prime Factorization.html',

                },
                {
                  id: 'proving-irrationality',
                  name: 'Proving Irrationality of Square Roots',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Real Numbers/Proving Irrationality Of Square Roots.html',

                },
                {
                  id: 'irrationality-operations',
                  name: 'Irrationality of Sums and Products',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Real Numbers/Irrationality Of Sums And Products.html',

                }
              ]
            },
            {
              id: 'Pair Of Linear Equations In Two Variables',
              name: 'Pair Of Linear Equations In Two Variables',

              contentPath: '/FinalContent/Class 10th/Mathematics/Pair Of Linear Equations In Two Variables/Linear Equations Preview.html',
              pdfPath: '/FinalContent/Class 10th/Mathematics/Pair Of Linear Equations In Two Variables/Pair of Linear Equations in two variables.pdf',

              subtopics: [
                {
                  id: 'linear-equations-part-1',
                  name: 'Linear Equations Part 1',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Pair Of Linear Equations In Two Variables/linear_equations_part_1.html',

                },
                {
                  id: 'linear-equations-preview',
                  name: 'Linear Equations Preview',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Pair Of Linear Equations In Two Variables/Linear Equations Preview.html',

                },
                {
                  id: 'linear-equations-graphical',
                  name: 'Graphical Method',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Pair Of Linear Equations In Two Variables/Linear Equations Graphical.html',

                },
                {
                  id: 'substitution-method',
                  name: 'Substitution Method',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Pair Of Linear Equations In Two Variables/Substitution Method.html',

                },
                {
                  id: 'elimination-method',
                  name: 'Elimination Method',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Pair Of Linear Equations In Two Variables/Elimination Method.html',

                },
                {
                  id: 'chapter-summary',
                  name: 'Chapter Summary',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Pair Of Linear Equations In Two Variables/Chapter Summary.html',

                }
              ]
            },
            {
              id: 'Arithmetic Progression',
              name: 'Arithmetic Progression',

              contentPath: '/FinalContent/Class 10th/Mathematics/Arithmetic Progression/AP Fundamentals.html',
              pdfPath: '/FinalContent/Class 10th/Mathematics/Arithmetic Progression/Arithmetic Progressions.pdf',

              subtopics: [
                {
                  id: 'ap_patterns_intro',
                  name: 'Introduction to Patterns',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Arithmetic Progression/AP Patterns.html',

                },
                {
                  id: 'ap_fundamentals',
                  name: 'AP Fundamentals',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Arithmetic Progression/AP Fundamentals.html',

                },
                {
                  id: 'ap_nth_term',
                  name: 'nth Term of AP',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Arithmetic Progression/AP Nth Term.html',

                },
                {
                  id: 'ap_sum_terms',
                  name: 'Sum of Terms in AP',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Arithmetic Progression/AP Sum Terms.html',

                },
                {
                  id: 'ap_advanced_applications',
                  name: 'Advanced Applications',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Arithmetic Progression/AP Advanced Applications.html',

                }
              ]
            },
            {
              id: 'Quadratic Equations',
              name: 'Quadratic Equations',

              contentPath: '/FinalContent/Class 10th/Mathematics/Quadratic Equations/Quadratic Equations Learning.html',
              pdfPath: '/FinalContent/Class 10th/Mathematics/Quadratic Equations/Quadratic Equations.pdf',

              subtopics: [
                {
                  id: 'quadratic_intro',
                  name: 'Introduction to Quadratic Equations',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Quadratic Equations/Quadratic Equations Learning.html',

                },
                {
                  id: 'quadratic_equations_learning',
                  name: 'Quadratic Equations Learning',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Quadratic Equations/Quadratic Equations Learning.html',

                },
                {
                  id: 'factorization_method',
                  name: 'Factorization Quadratic Solver',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Quadratic Equations/Factorization Quadratic Solver.html',

                },
                {
                  id: 'nature_of_roots',
                  name: 'Nature Of Roots Explorer',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Quadratic Equations/Nature Of Roots Explorer.html',

                }
              ]
            },
            {
              id: 'Coordinate Geometry',
              name: 'Coordinate Geometry',

              contentPath: '/FinalContent/Class 10th/Mathematics/Coordinate Geometry/Coordinate Geometry.html',
              pdfPath: '/FinalContent/Class 10th/Mathematics/Coordinate Geometry/COORDINATE GEOMETRY.pdf',

              subtopics: [
                {
                  id: 'coordinate-geometry-intro',
                  name: 'Introduction to Coordinate Geometry',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Coordinate Geometry/Coordinate Geometry.html',

                },
                {
                  id: 'distance-formula',
                  name: 'Distance Formula',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Coordinate Geometry/Distance Formula.html',

                }
              ]
            },
            {
              id: 'Polynomials',
              name: 'Polynomials',

              contentPath: '/FinalContent/Class 10th/Mathematics/Polynomials/Introduction To Polynomials.html',
              pdfPath: '/FinalContent/Class 10th/Mathematics/Polynomials/Polynomials.pdf',

              subtopics: [
                {
                  id: 'introduction-polynomials',
                  name: 'Introduction to Polynomials',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Polynomials/Introduction To Polynomials.html',

                },
                {
                  id: 'geometrical-meaning',
                  name: 'Geometrical Meaning of Zeroes',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Polynomials/Geometrical Meaning of Zeroes.html',

                },
                {
                  id: 'zeroes-coefficients',
                  name: 'Relationship Between Zeroes and Coefficients',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Polynomials/Relationship Zeroes Coefficients.html',

                },
                {
                  id: 'cubic-polynomials',
                  name: 'Cubic Polynomials Relationship',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Polynomials/Cubic Polynomials Relationship.html',

                }
              ]
            },
            {
              id: 'Triangles',
              name: 'Triangles',

              contentPath: '/FinalContent/Class 10th/Mathematics/Triangles/Similar And Congruent Traingles.html',
              pdfPath: '/FinalContent/Class 10th/Mathematics/Triangles/Triangles.pdf',

              subtopics: [
                {
                  id: 'similar-congruent',
                  name: 'Similar and Congruent Triangles',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Triangles/Similar And Congruent Traingles.html',

                },
                {
                  id: 'similarity-criteria',
                  name: 'Criteria for Triangle Similarity',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Triangles/Criteria For Triangle Similarity.html',

                },
                {
                  id: 'bpt-theorem',
                  name: 'Basic Proportionality Theorem',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Triangles/Basic Proportionality Theorem (Thales Theorem).html',

                },
                {
                  id: 'applications-similar',
                  name: 'Applications of Similar Triangles',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Triangles/Applications Of Similar Triangles.html',

                },
                {
                  id: 'advanced-problems',
                  name: 'Advanced Problems and Exercises',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Triangles/Advanced Problems And Exercise Solution.html',

                }
              ]
            },
            {
              id: 'Circles',
              name: 'Circles',

              contentPath: '/FinalContent/Class 10th/Mathematics/Circles/Introduction.html',
              pdfPath: '/FinalContent/Class 10th/Mathematics/Circles/Circles.pdf',

              subtopics: [
                {
                  id: 'circles-introduction',
                  name: 'Introduction to Circles',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Circles/Introduction.html',

                },
                {
                  id: 'tangent-secant',
                  name: 'Tangent and Secant',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Circles/Tangent and Secant.html',

                },
                {
                  id: 'tangent-perpendicular',
                  name: 'Tangent Perpendicular Theorem',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Circles/Tangent Perpendicular Theorem.html',

                },
                {
                  id: 'equal-tangent-length',
                  name: 'Equal Tangent Length Theorem',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Circles/Equal Tangent Length Theorem.html',

                },
                {
                  id: 'tangent-point-position',
                  name: 'Tangent Point Position',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Circles/Tangent Point Position.html',

                },
                {
                  id: 'concentric-circles',
                  name: 'Concentric Circles',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Circles/Concentric Circles.html',

                },
                {
                  id: 'angles-relationship',
                  name: 'Angles Relationship in Circles',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Circles/Angles Relationship.html',

                }
              ]
            },
            {
              id: 'Introduction to Trigonometry',
              name: 'Introduction to Trigonometry',

              contentPath: '/FinalContent/Class 10th/Mathematics/Introdunction To Trignometry/Trigonometry Basics.html',
              pdfPath: '/FinalContent/Class 10th/Mathematics/Introdunction To Trignometry/Introduction to Trigonometry.pdf',

              subtopics: [
                {
                  id: 'trigonometry-basics',
                  name: 'Trigonometry Basics',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Introdunction To Trignometry/Trigonometry Basics.html',

                },
                {
                  id: 'trigonometric-ratios',
                  name: 'Trigonometric Ratios and Definitions',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Introdunction To Trignometry/Trigonometric Ratios.html',

                },
                {
                  id: 'special-angles',
                  name: 'Special Angles in Trigonometry',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Introdunction To Trignometry/Trignometry Special Angles.html',

                },
                {
                  id: 'trig-properties',
                  name: 'Properties and Relationships of Trigonometric Ratios',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Introdunction To Trignometry/Trigonometric Ratios Properties.html',

                },
                {
                  id: 'trig-identities',
                  name: 'Trigonometric Identities',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Introdunction To Trignometry/Trigonometric Identities.html',

                },
                {
                  id: 'trig-applications',
                  name: 'Trigonometry Applications and Problem Solving',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Introdunction To Trignometry/Trigonometry Applications.html',

                }
              ]
            },
            {
              id: 'Some Applications of Trigonometry',
              name: 'Some Applications of Trigonometry',

              contentPath: '/FinalContent/Class 10th/Mathematics/Some Application Of Trignometry/Heights And Distances.html',
              pdfPath: '/FinalContent/Class 10th/Mathematics/Some Application Of Trignometry/Some applications of Trigonometry.pdf',

              subtopics: [
                {
                  id: 'heights-distances',
                  name: 'Heights and Distances',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Some Application Of Trignometry/Heights And Distances.html',

                },
                {
                  id: 'height-distance-problems',
                  name: 'Height and Distance Problems',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Some Application Of Trignometry/Heights Distances Problems.html',

                }
              ]
            },
            {
              id: 'Areas Related to Circles',
              name: 'Areas Related to Circles',

              contentPath: '/FinalContent/Class 10th/Mathematics/Areas Related To Circle/Sectors And Segments.html',
              pdfPath: '/FinalContent/Class 10th/Mathematics/Areas Related To Circle/Area related to Circles.pdf',

              subtopics: [
                {
                  id: 'sectors-segments',
                  name: 'Sectors and Segments',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Areas Related To Circle/Sectors And Segments.html',

                },
                {
                  id: 'sector-area-formula',
                  name: 'Sector Area Formula',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Areas Related To Circle/Sector Area Formula.html',

                },
                {
                  id: 'arc-length-formula',
                  name: 'Arc Length Formula',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Areas Related To Circle/Arc Length Formula.html',

                }
              ]
            },
            {
              id: 'Surface Area and Volumes',
              name: 'Surface Area and Volumes',

              contentPath: '/FinalContent/Class 10th/Mathematics/Surface Area And Volumes/Combination Of Solids.html',
              pdfPath: '/FinalContent/Class 10th/Mathematics/Surface Area And Volumes/Surface Areas and Volumes.pdf',

              subtopics: [
                {
                  id: 'combination-solids',
                  name: 'Combination of Solids',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Surface Area And Volumes/Combination Of Solids.html',

                },
                {
                  id: 'surface-area-combination',
                  name: 'Surface Area of Combinations',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Surface Area And Volumes/2. Surface Area Combinations.html',

                },
                {
                  id: 'volume-combination',
                  name: 'Volume of Combinations',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Surface Area And Volumes/Volumem Combinations.html',

                }
              ]
            },
            {
              id: 'Statistics',
              name: 'Statistics',

              contentPath: '/FinalContent/Class 10th/Mathematics/Statistics/Intoduction.html',
              pdfPath: '/FinalContent/Class 10th/Mathematics/Statistics/Statistics.pdf',

              subtopics: [
                {
                  id: 'statistics-introduction',
                  name: 'Introduction to Statistics',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Statistics/Intoduction.html',

                },
                {
                  id: 'mean-grouped-data',
                  name: 'Mean of Grouped Data',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Statistics/Mean Of Grouped Data.html',

                },
                {
                  id: 'median-grouped-data',
                  name: 'Median of Grouped Data',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Statistics/Medial Of Grouped Data.html',

                },
                {
                  id: 'mode-grouped-data',
                  name: 'Mode of Grouped Data',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Statistics/Mode Of Grouped Data.html',

                },
                {
                  id: 'comparison-applications',
                  name: 'Comparison and Applications of Central Tendency',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Statistics/Comparison And Applications Of Central Tendency.html',

                }
              ]
            },
            {
              id: 'Probability',
              name: 'Probability',

              contentPath: '/FinalContent/Class 10th/Mathematics/Probability/Introduction To Probability.html',
              pdfPath: '/FinalContent/Class 10th/Mathematics/Probability/Probability.pdf',

              subtopics: [
                {
                  id: 'probability-introduction',
                  name: 'Introduction to Probability',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Probability/Inroduction.html',

                },
                {
                  id: 'elementary-events',
                  name: 'Elementary Events and Sample Space',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Probability/Elementry Events And Sample Space.html',

                },
                {
                  id: 'complementary-events',
                  name: 'Complementary Events and Probability Range',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Probability/Complementary Events And Probability Range.html',

                },
                {
                  id: 'real-world-applications',
                  name: 'Real World Probability Applications',
                  contentPath: '/FinalContent/Class 10th/Mathematics/Probability/Real world Probability Applications.html',

                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export function getCurriculum(classLevel: string): CurriculumSubject[] {
  return curriculum[classLevel] || [];
}

export function findTopic(
  topicId: string,
  classLevel: string
): { subject: CurriculumSubject; chapter: CurriculumChapter; topic: CurriculumTopic } | null {
  const subjects = getCurriculum(classLevel);
  for (const subject of subjects) {
    for (const chapter of subject.chapters) {
      for (const topic of chapter.topics) {
        if (topic.id === topicId) {
          return { subject, chapter, topic };
        }
      }
    }
  }
  return null;
}

export function getTopicContentPaths(topicId: string, classLevel: string): string[] {
  const result = findTopic(topicId, classLevel);
  if (!result) return [];
  const paths: string[] = [];
  if (result.topic.contentPath) paths.push(result.topic.contentPath);
  if (result.topic.subtopics) {
    for (const st of result.topic.subtopics) {
      if (st.contentPath) paths.push(st.contentPath);
    }
  }
  return paths;
}

export function getAllTopics(classLevel: string): Array<{ subject: CurriculumSubject; chapter: CurriculumChapter; topic: CurriculumTopic }> {
  const subjects = getCurriculum(classLevel);
  const all: Array<{ subject: CurriculumSubject; chapter: CurriculumChapter; topic: CurriculumTopic }> = [];
  for (const subject of subjects) {
    for (const chapter of subject.chapters) {
      for (const topic of chapter.topics) {
        all.push({ subject, chapter, topic });
      }
    }
  }
  return all;
}
