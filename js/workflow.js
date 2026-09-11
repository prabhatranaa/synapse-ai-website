/**
 * SYNAPSE ENTERPRISE AI - INTERACTIVE WORKFLOW PIPELINE SIMULATOR
 * Real-time enterprise scenario switcher and animated state transitions
 */

const workflowData = {
  fraud: {
    title: "Autonomous Financial Fraud Interception",
    description: "Multi-layered cognitive verification executing in under 24ms across high-throughput payment rails.",
    nodes: [
      {
        step: "STEP 01",
        title: "Ingestion & Enrichment",
        desc: "Ingesting 85,000 tx/sec with IP geolocation, device biometrics, and historical velocity tags.",
        metric: "Ingestion: 2.1ms"
      },
      {
        step: "STEP 02",
        title: "Cognitive Vector Search",
        desc: "Querying 120M high-dimensional transaction embeddings for topological anomalies.",
        metric: "Similarity: 0.994"
      },
      {
        step: "STEP 03",
        title: "Agentic Consensus",
        desc: "3 autonomous neural auditors debate transaction risk score against enterprise policy.",
        metric: "Consensus: 99.8%"
      },
      {
        step: "STEP 04",
        title: "Autonomous Action",
        desc: "Instant ledger escrow freeze and dynamic step-up authentication webhook trigger.",
        metric: "Action: Complete"
      },
      {
        step: "STEP 05",
        title: "Deterministic Audit",
        desc: "Cryptographic hash generation and SOC2 compliance telemetry streamed to Snowflake.",
        metric: "Audit Hash: #9f8a2"
      }
    ],
    terminalLogs: [
      { time: "13:42:01.104", action: "[INGEST]", text: "Payment batch #48209 received from Stripe Gateway (EUR 142,500.00)" },
      { time: "13:42:01.112", action: "[VECTOR]", text: "Anomaly detected in IP delta (velocity threshold +430% above 30d baseline)" },
      { time: "13:42:01.120", action: "[AGENTS]", text: "Swarm Consensus Reached (Auditor-1: 99.2%, Auditor-2: 99.8% confidence)" },
      { time: "13:42:01.127", action: "[RESOLVE]", text: "Escrow hold applied; SMS biometric token issued to account holder in 23ms" }
    ]
  },
  support: {
    title: "Enterprise Multi-Tier Incident Resolution",
    description: "Self-healing enterprise infrastructure pipeline diagnosing and executing corrective code in production.",
    nodes: [
      {
        step: "STEP 01",
        title: "Telemetry Ingestion",
        desc: "Streaming Datadog and Kubernetes cluster metrics across 4,200 microservices.",
        metric: "Telemetry: 1.4ms"
      },
      {
        step: "STEP 02",
        title: "Root Cause Synthesis",
        desc: "Pinpointing memory leak cascade to commit #a49f12 in checkout authentication gateway.",
        metric: "Confidence: 99.4%"
      },
      {
        step: "STEP 03",
        title: "Safety Boundary Check",
        desc: "Enterprise guardrails verify zero customer data exposure and zero disruption window.",
        metric: "Guardrails: Passed"
      },
      {
        step: "STEP 04",
        title: "Canary Rollback",
        desc: "Autonomous Kubernetes rolling update to stable container image with traffic split.",
        metric: "Rollback: 100%"
      },
      {
        step: "STEP 05",
        title: "Post-Mortem & Ticket",
        desc: "Jira ticket updated with root cause breakdown and pull request submitted with fix.",
        metric: "PR #842 Opened"
      }
    ],
    terminalLogs: [
      { time: "13:42:04.221", action: "[TELEMETRY]", text: "Pod crash loop detected on eu-central-1 cluster (Node-48)" },
      { time: "13:42:04.238", action: "[ANALYSIS]", text: "Correlated OOM exception with recent deployment 'v2.8.4-rc'" },
      { time: "13:42:04.251", action: "[EXECUTE]", text: "Traffic shifted to healthy pool; container auto-reverted in 18ms" },
      { time: "13:42:04.269", action: "[AUDIT]", text: "Incident resolved with 0 downtime; Slack alert dispatched to #eng-core" }
    ]
  },
  supply: {
    title: "Global Supply Chain Autonomous Optimization",
    description: "Dynamic route calculation, port congestion mitigation, and inventory balancing across 14 hubs.",
    nodes: [
      {
        step: "STEP 01",
        title: "Sensor & Weather Stream",
        desc: "Real-time vessel AIS trackers, maritime weather forecasts, and port crane queue data.",
        metric: "Feeds: 340 Live"
      },
      {
        step: "STEP 02",
        title: "Predictive Congestion",
        desc: "Forecasting 96-hour demurrage delays at Rotterdam terminal based on storm surge models.",
        metric: "Delay: 4.2 Days"
      },
      {
        step: "STEP 03",
        title: "Multi-Modal Optimizer",
        desc: "Simulating 1,200 alternate route permutations across rail, barge, and secondary ports.",
        metric: "Optimal: Route #7"
      },
      {
        step: "STEP 04",
        title: "Automated Booking",
        desc: "Autonomous dispatch of EDI customs manifests and booking Antwerp alternative berths.",
        metric: "EDI: Confirmed"
      },
      {
        step: "STEP 05",
        title: "Cost & SLA Savings",
        desc: "Total avoidance of $340,000 demurrage penalties and 4-day delivery commitment protected.",
        metric: "Saved: $340K"
      }
    ],
    terminalLogs: [
      { time: "13:42:08.512", action: "[SENSOR]", text: "Rotterdam congestion index increased to 8.4 due to channel fog" },
      { time: "13:42:08.528", action: "[OPTIMIZE]", text: "Calculated intermodal diversion: Vessel Maersk-Alpha redirected to Antwerp" },
      { time: "13:42:08.544", action: "[EDI-DISPATCH]", text: "Customs clearance manifest #NL-849 updated via EU Customs API" },
      { time: "13:42:08.562", action: "[COMPLETED]", text: "Cargo delivery SLA intact; $340,000 demurrage fees fully avoided" }
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const scenarioButtons = document.querySelectorAll('.scenario-btn');
  const pipelineNodes = document.querySelectorAll('.pipeline-node');
  const terminalLogsContainer = document.getElementById('terminal-logs');
  let activeIndex = 0;
  let cycleInterval = null;

  function setScenario(scenarioKey) {
    const data = workflowData[scenarioKey];
    if (!data) return;

    // Update scenario buttons
    scenarioButtons.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.scenario === scenarioKey);
    });

    // Update nodes
    pipelineNodes.forEach((node, idx) => {
      const nodeData = data.nodes[idx];
      if (nodeData) {
        const stepEl = node.querySelector('.node-step-index span');
        const titleEl = node.querySelector('.node-title');
        const descEl = node.querySelector('.node-desc');
        const metricEl = node.querySelector('.node-metric');

        if (stepEl) stepEl.textContent = nodeData.step;
        if (titleEl) titleEl.textContent = nodeData.title;
        if (descEl) descEl.textContent = nodeData.desc;
        if (metricEl) metricEl.innerHTML = `<span>●</span> ${nodeData.metric}`;
      }
    });

    // Update terminal logs
    if (terminalLogsContainer) {
      terminalLogsContainer.innerHTML = '';
      data.terminalLogs.forEach(log => {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `
          <span class="terminal-timestamp">[${log.time}]</span>
          <span class="terminal-action">${log.action}</span>
          <span class="terminal-text">${log.text}</span>
        `;
        terminalLogsContainer.appendChild(line);
      });
    }
  }

  // Active step pulse animation
  function highlightStep(stepIdx) {
    pipelineNodes.forEach((node, idx) => {
      node.classList.toggle('is-active-step', idx === stepIdx);
    });
  }

  function startPipelineLoop() {
    clearInterval(cycleInterval);
    cycleInterval = setInterval(() => {
      activeIndex = (activeIndex + 1) % pipelineNodes.length;
      highlightStep(activeIndex);
    }, 2400);
  }

  scenarioButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setScenario(btn.dataset.scenario);
      activeIndex = 0;
      highlightStep(0);
      startPipelineLoop();
    });
  });

  // Initialize with 'fraud'
  setScenario('fraud');
  highlightStep(0);
  startPipelineLoop();
});
