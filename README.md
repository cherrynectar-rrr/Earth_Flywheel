# Project Earth Flywheel / 地球飞轮

Status: Research Seed — Sprint v0
Authorized by: Horizon Core
Start date: 2026-09-02

## Long-term Research Question

How can embodied agents safely explore unfamiliar physical situations, turn local experience into transferable knowledge, and share validated experience across heterogeneous robot fleets?

This is a research hypothesis, not a declared permanent career identity.

## Sprint v0 — Earth Flywheel Hand v0

### Purpose

Build one minimal real robot body subsystem instead of beginning with a whole robot.

The first subsystem is a **two-finger gripper / minimal robotic hand** because it creates a compact physical testbed for the Earth Flywheel questions that currently matter most:

- physical contact;
- unknown-object probing;
- grasp force;
- slip and failure;
- tactile / force feedback;
- local adaptation;
- experience recording;
- later shared learning across agents or embodiments.

Sprint v0 does **not** attempt to build a humanoid hand, full arm or general-purpose robot.

### Research Hypothesis

> A small embodied gripper should be able to approach an unfamiliar object conservatively, use physical feedback to adjust its action, record the outcome as experience, and eventually reuse validated experience to reduce unnecessary or unsafe probing.

The first sprint only needs to establish the physical and software substrate for testing this hypothesis. It does not need to solve fleet learning yet.

### Core Loop

`unknown object -> cautious contact / grip -> tactile or force observation -> outcome -> local experience -> improved next attempt`

Later sprints may extend this to:

`local experience -> validated shared memory -> another agent / embodiment -> safer or faster action`

## Hardware Scope

### Target body part

**Earth Flywheel Hand v0 — minimal two-finger gripper.**

Preferred characteristics:

- one simple closing / opening degree of freedom at first;
- low-cost replaceable mechanical structure;
- controllable actuator;
- at least one measurable contact / force signal;
- safe low-force operation suitable for tabletop objects;
- architecture that can later accept better tactile sensing without rebuilding the entire project.

The exact actuator, sensor, mechanics and fabrication method are not fixed by this README. They should be selected only after the learner passes the zero-baseline foundation gate and can understand the trade-offs.

### Controller relationship

The current Horizon Embedded exploration should provide the low-level control foundation rather than creating a separate hardware-learning line.

The existing MCU bring-up objective remains useful:

`STM32CubeIDE -> Build -> Flash -> Debug -> real I/O`

After bring-up, Earth Flywheel Hand v0 may become the meaningful integrated application target for embedded control, subject to the existing Horizon capacity and specialist ownership rules.

## Sprint Structure

### Gate 0A — Robot Hand Foundations 0

This gate exists because the learner is currently a true beginner in robotics / mechatronics and should not be asked to design a hand before understanding the minimum vocabulary and system model.

The learner should self-study enough to explain, in simple language:

- what a motor / actuator does;
- what a sensor does;
- what a microcontroller does;
- what power supply / voltage / current mean at a practical beginner level;
- what open-loop and closed-loop control mean;
- what feedback means;
- what a two-finger gripper is;
- what force / contact / slip mean in this project;
- why software alone cannot directly move a physical finger without electronics and an actuator.

Minimum success test:

Given a simple block diagram such as

`PC / high-level logic -> MCU -> motor driver / actuator -> gripper -> object -> sensor -> MCU`,

the learner can explain what each block does and trace what happens when the gripper closes on an object.

No CAD, component selection, circuit design or control mathematics is required yet.

### Gate 0B — Body-Part Architecture

Only after Gate 0A passes, produce a concrete first design:

- sketch / CAD / mechanical concept for the two-finger gripper;
- actuator choice rationale;
- sensing choice rationale;
- MCU / power / signal architecture;
- safety limits;
- expected measurable variables;
- estimated bill of materials;
- explicit statement of what can be built with existing hardware and what must be acquired.

Gate 0B is a design gate, not a requirement to over-engineer CAD or documentation.

### Gate 1 — Open / Close / Measure

Build the smallest physical loop that can:

1. open the gripper;
2. close the gripper under controlled command;
3. detect contact or measure a contact-related signal;
4. stop or limit actuation safely;
5. log command + sensor + outcome data.

No AI is required.

### Gate 2 — Closed-Loop Physical Reflex

Add one local feedback behavior such as:

- stop when contact force reaches a threshold;
- increase force when slip is detected;
- back off when force exceeds a safety limit.

The loop should run locally and deterministically. A high-level model should not be required for every millisecond-scale correction.

### Gate 3 — Unknown-Object Probe

Define a small set of unfamiliar tabletop objects and test a cautious probing policy.

Measure at least:

- successful grasp rate;
- slip / drop events;
- over-force / unsafe events;
- number of probe adjustments;
- time or attempts before stable grasp.

### Gate 4 — Experience Memory

Record each encounter in a structured form such as:

`object observations + action + tactile / force trace + outcome + confidence`

Then test whether local memory helps on later similar encounters.

### Later Gate — Fleet / Cross-Embodiment

Only after one physical hand can generate reliable experience should the project test shared memory across multiple simulated agents, multiple grippers or different embodiments.

## Simulation Role

Simulation is retained as a support tool rather than the first deliverable.

A small Python toy model or later MuJoCo model may be used to:

- test algorithms before risking hardware;
- generate counterexamples;
- compare no-memory / local-memory / shared-memory conditions;
- explore scaling beyond the single physical hand.

Simulation must not replace real physical feedback when the research claim concerns real contact or manipulation.

## Current Forbidden Scope

Do not add these in Sprint v0 unless a later Core decision expands scope:

- full humanoid hand;
- full robot arm;
- humanoid body;
- walking / legged robotics;
- ROS 2 merely for architecture prestige;
- reinforcement learning before a deterministic baseline exists;
- VLA models;
- large cloud fleet infrastructure;
- expensive tactile arrays without evidence that simple sensing is insufficient;
- complex 3D simulation before the physical subsystem exists.

The point is to build one small body part that can **feel, act, fail, record and improve**.

## Learning Mode

Use Horizon Learning Loop v0.2 — Self-Study + Assessment.

Horizon defines capability targets and recommends a small set of references. The learner owns study, implementation and debugging. Missing mechanics, electronics, embedded, control, Python or experimental concepts are learned just in time.

For true zero-baseline material, Horizon should provide beginner-level vocabulary and a curated foundation resource pack before asking for independent design. Self-study does not mean guessing concepts that have never been introduced.

## Sprint v0 Exit Gate

Sprint v0 passes only if:

1. one real two-finger gripper is physically built and controllable;
2. at least one contact / force-related signal is measured reproducibly;
3. one deterministic feedback / safety behavior works on hardware;
4. encounters can be logged as structured experience;
5. multiple objects produce interpretable experimental results;
6. the learner can explain failures and limitations without overclaiming general intelligence;
7. the project remains bounded enough not to damage GPA or higher-priority Horizon obligations.

### Exit Decisions

After Sprint v0, Horizon Core may choose:

- **Continue** — improve sensing / control / experiments;
- **Promote** — Earth Flywheel earns a larger bounded research role;
- **Hold** — preserve the seed but return resources to other lines;
- **Stop** — evidence, feasibility or interest is insufficient.

---

## Migration Note — 2026-09-04

This repository is now the canonical engineering/research home for Earth Flywheel. The pre-separation copy remains in `Project_Horizon` only as migration-era historical material until final cleanup.

Cross-project priority remains owned by `Project_Horizon/00_Project_Control/MASTER_STATUS.md`.
