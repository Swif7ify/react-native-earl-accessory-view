import { StyleSheet, Platform } from "react-native";

/**
 * Default styles for all accessory view components.
 * Platform-specific shadow and elevation are handled automatically.
 */
export const styles = StyleSheet.create({
	// ─── Outer Wrapper ─────────────────────────────────────────────────
	outerContainer: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 9999,
	},

	// ─── Main Container ────────────────────────────────────────────────
	container: {
		backgroundColor: "#FFFFFF",
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: "#E0E0E0",
		...Platform.select({
			ios: {
				shadowColor: "#000000",
				shadowOffset: { width: 0, height: -2 },
				shadowOpacity: 0.08,
				shadowRadius: 4,
			},
			android: {
				elevation: 4,
			},
			default: {
				// Web fallback
				shadowColor: "#000000",
				shadowOffset: { width: 0, height: -2 },
				shadowOpacity: 0.08,
				shadowRadius: 4,
			},
		}),
	},

	// ─── Content Row ───────────────────────────────────────────────────
	contentContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		height: 44,
	},

	contentContainerReverse: {
		flexDirection: "row-reverse",
	},

	// ─── Preview Text ────────────────────────────────────────────────
	previewValue: {
		flex: 1,
		fontSize: 15,
		fontWeight: "400",
		color: "#111111",
		letterSpacing: 0.1,
	},

	previewPlaceholder: {
		flex: 1,
		fontSize: 15,
		fontWeight: "400",
		color: "#AAAAAA",
		fontStyle: "italic",
	},

	previewScroll: {
		flex: 1,
	},

	previewScrollContent: {
		alignItems: "center",
		flexGrow: 1,
	},

	previewInput: {
		flex: 1,
		fontSize: 15,
		fontWeight: "400",
		color: "#111111",
		letterSpacing: 0.1,
		padding: 0,
		margin: 0,
		minWidth: "100%",
	},

	label: {
		fontSize: 12,
		fontWeight: "600",
		color: "#888888",
		marginRight: 10,
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},

	// ─── Text ──────────────────────────────────────────────────────────
	text: {
		flex: 1,
		fontSize: 15,
		fontWeight: "500",
		color: "#333333",
		letterSpacing: 0.2,
	},

	textRight: {
		textAlign: "right",
	},

	// ─── Dismiss Button ────────────────────────────────────────────────
	dismissButton: {
		minWidth: 44,
		minHeight: 44,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 22,
		marginLeft: 8,
	},

	dismissButtonLeft: {
		marginLeft: 0,
		marginRight: 8,
	},

	dismissButtonText: {
		fontSize: 18,
		fontWeight: "600",
		color: "#666666",
		lineHeight: 20,
	},

	dismissButtonPressed: {
		opacity: 0.5,
		backgroundColor: "rgba(0, 0, 0, 0.05)",
	},

	// ─── Character Counter ─────────────────────────────────────────────
	charCountContainer: {
		paddingHorizontal: 16,
		paddingBottom: 6,
		paddingTop: 2,
	},

	charCountContainerLeft: {
		alignItems: "flex-start",
	},

	charCountContainerRight: {
		alignItems: "flex-end",
	},

	charCountContainerCenter: {
		alignItems: "center",
	},

	charCountText: {
		fontSize: 11,
		fontWeight: "400",
		color: "#999999",
		letterSpacing: 0.3,
	},

	// ─── Safe Area Spacer ──────────────────────────────────────────────
	safeAreaSpacer: {
		backgroundColor: "#FFFFFF",
	},

	// ─── Children wrapper ──────────────────────────────────────────────
	childrenContainer: {
		flex: 1,
	},
});
