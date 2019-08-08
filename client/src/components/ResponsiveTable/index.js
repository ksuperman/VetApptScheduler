import React from 'react';
import './responsiveTable.module.css';

const ResponsiveTables = () => (
    <div className="Rtable Rtable--4cols Rtable--collapse">
        <div className="Rtable-cell Rtable-cell--head"><h3>Eddard Stark</h3></div>
        <div className="Rtable-cell">Has a sword named Ice</div>
        <div className="Rtable-cell">No direwolf</div>
        <div className="Rtable-cell Rtable-cell--foot"><strong>Lord of Winterfell</strong></div>

        <div className="Rtable-cell Rtable-cell--head"><h3>Jon Snow</h3></div>
        <div className="Rtable-cell">Has a sword named Longclaw</div>
        <div className="Rtable-cell">Direwolf: Ghost</div>
        <div className="Rtable-cell Rtable-cell--foot"><strong>Knows nothing</strong></div>
    </div>
);

export default ResponsiveTables;
