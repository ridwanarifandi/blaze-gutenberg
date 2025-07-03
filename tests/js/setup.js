/**
 * Jest setup file
 */

// Mock WordPress globals
global.wp = {
    blocks: {
        registerBlockType: jest.fn(),
    },
    element: {
        createElement: jest.fn(),
        useState: jest.fn(),
        useEffect: jest.fn(),
    },
    components: {
        PanelBody: jest.fn(),
        RangeControl: jest.fn(),
        ColorPicker: jest.fn(),
        ToggleControl: jest.fn(),
        SelectControl: jest.fn(),
        TextControl: jest.fn(),
        Button: jest.fn(),
        Spinner: jest.fn(),
    },
    blockEditor: {
        useBlockProps: jest.fn(),
        InspectorControls: jest.fn(),
    },
    i18n: {
        __: jest.fn((text) => text),
    },
    data: {
        useSelect: jest.fn(),
    },
    apiFetch: jest.fn(),
};

// Mock DOM methods
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Mock console methods to reduce noise in tests
global.console = {
    ...console,
    warn: jest.fn(),
    error: jest.fn(),
};
