export default function SettingsPreview() {
  return (
    <div className="settings-preview">
      <div className="settings-panel">
        <div className="fake-checkbox-row">
          <span className="fake-checkbox" />
          Show Networks
        </div>

        <div className="fake-checkbox-row">
          <span className="fake-checkbox" />
          Show Activities
        </div>

        <small>DISPLAY</small>
        <div className="fake-radio">◉ Sort by Grid Data</div>
        <div className="fake-radio">○ Group by Categories</div>
      </div>

      <div className="settings-panel settings-panel-right">
        <div className="fake-checkbox-row">
          <span className="fake-checkbox checked" />
          Title
        </div>
        <div className="fake-checkbox-row">
          <span className="fake-checkbox checked" />
          Admin
        </div>

        <div className="fake-switch-row">
          <span className="fake-switch" />
          Incomplete tasks
        </div>

        <div className="fake-switch-row">
          <span className="fake-switch off" />
          Incomplete tasks
        </div>
      </div>
    </div>
  );
}
